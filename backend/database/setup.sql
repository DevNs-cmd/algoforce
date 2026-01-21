-- =====================================================
-- AlgoForce Contact Management System - Supabase Setup
-- =====================================================
-- Run this SQL script in your Supabase SQL Editor
-- Project: DevNs-cmd's Project
-- Environment: Production
-- =====================================================

-- 1. CREATE CONTACTS TABLE (if not exists)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  role TEXT,
  problem TEXT NOT NULL,
  inquiryType TEXT DEFAULT 'demo',
  status TEXT DEFAULT 'pending',
  otp TEXT, -- Stores HASHED OTP (bcrypt)
  otp_expiry TIMESTAMP WITH TIME ZONE,
  otp_verified BOOLEAN DEFAULT false,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CREATE INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_contacts_email ON public.contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_submitted_at ON public.contacts(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_otp_verified ON public.contacts(otp_verified);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON public.contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_email_unverified ON public.contacts(email, otp_verified) WHERE otp_verified = false;

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================
-- CRITICAL: This protects data while allowing backend operations

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- 4. DROP EXISTING POLICIES (clean slate)
-- =====================================================

DROP POLICY IF EXISTS "Allow public contact inserts" ON public.contacts;
DROP POLICY IF EXISTS "Allow service role full access" ON public.contacts;
DROP POLICY IF EXISTS "Block public reads" ON public.contacts;
DROP POLICY IF EXISTS "Block public updates" ON public.contacts;
DROP POLICY IF EXISTS "Block public deletes" ON public.contacts;

-- 5. CREATE RLS POLICIES
-- =====================================================

-- Policy 1: Allow PUBLIC inserts (for contact form submissions)
-- Users can submit contact forms without authentication
CREATE POLICY "Allow public contact inserts"
ON public.contacts
FOR INSERT
TO public
WITH CHECK (true);

-- Policy 2: Allow SERVICE_ROLE full access (for backend operations)
-- Backend using service_role key can read/update/delete
CREATE POLICY "Allow service role full access"
ON public.contacts
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Policy 3: Block PUBLIC reads (prevent data exposure)
-- Public users cannot read contact data
CREATE POLICY "Block public reads"
ON public.contacts
FOR SELECT
TO public
USING (false);

-- Policy 4: Block PUBLIC updates (prevent unauthorized modifications)
-- Only backend with service_role can update
CREATE POLICY "Block public updates"
ON public.contacts
FOR UPDATE
TO public
USING (false)
WITH CHECK (false);

-- Policy 5: Block PUBLIC deletes (prevent data loss)
-- Only backend with service_role can delete
CREATE POLICY "Block public deletes"
ON public.contacts
FOR DELETE
TO public
USING (false);

-- 6. CREATE UPDATED_AT TRIGGER
-- =====================================================
-- Automatically update updated_at timestamp on row changes

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_contacts_updated_at ON public.contacts;

CREATE TRIGGER update_contacts_updated_at
BEFORE UPDATE ON public.contacts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 7. ADD COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE public.contacts IS 'Contact form submissions with OTP email verification';
COMMENT ON COLUMN public.contacts.otp IS 'Hashed OTP using bcrypt (10 rounds) - never store plain text';
COMMENT ON COLUMN public.contacts.otp_expiry IS 'OTP expires 10 minutes after generation';
COMMENT ON COLUMN public.contacts.otp_verified IS 'True when user successfully verifies email with OTP';
COMMENT ON COLUMN public.contacts.status IS 'Possible values: pending, verified, contacted, qualified, closed';

-- 8. VALIDATE SETUP
-- =====================================================
-- Run these queries to verify everything is correct

-- Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'contacts'
) AS table_exists;

-- Check if RLS is enabled
SELECT relname, relrowsecurity 
FROM pg_class 
WHERE relname = 'contacts' AND relnamespace = 'public'::regnamespace;

-- List all policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'contacts'
ORDER BY policyname;

-- =====================================================
-- SETUP COMPLETE
-- =====================================================
-- Next steps:
-- 1. Update backend/.env with SUPABASE_SERVICE_ROLE_KEY
-- 2. Test contact form submission
-- 3. Test OTP verification
-- 4. Monitor Supabase logs for any errors
-- =====================================================
