import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import PageVideoBackdrop from '../components/common/PageVideoBackdrop'

const CookiePolicy = () => {
    return (
        <>
            <Helmet>
                <title>Cookie Policy | AlgoForce AI</title>
                <meta
                    name="description"
                    content="Cookie Policy for AlgoForce AI. Learn how we use cookies, session tokens, and analytics trackers to improve your website experience."
                />
            </Helmet>

            <div className="min-h-screen pt-24 bg-white">
                {/* Header */}
                <section className="relative overflow-hidden py-16 text-white bg-[#03070d]">
                    <PageVideoBackdrop src="/video1.mp4" className="z-0" videoClassName="opacity-[0.2]" />
                    <div className="relative z-10 px-6 mx-auto text-center max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="mb-6 text-5xl font-bold md:text-6xl tracking-tight">
                                Cookie <span className="gradient-text bg-gradient-to-r from-purple-400 to-blue-400">Policy</span>
                            </h1>
                            <p className="max-w-3xl mx-auto text-xl text-gray-300">
                                Last updated: February 15, 2026
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-24">
                    <div className="max-w-4xl px-6 mx-auto">
                        <div className="prose prose-lg prose-navy max-w-none">
                            <h2 className="text-3xl font-bold text-[#06101d] mb-6 tracking-tight">How We Use Cookies</h2>
                            <p className="text-gray-700 mb-8 font-normal leading-relaxed">
                                This Cookie Policy explains how AlgoForce AI uses cookies, local storage keychains, and similar tracking technologies when you visit our website. By continuing to use our website, you consent to our use of cookies as detailed below.
                            </p>

                            <h2 className="text-3xl font-bold text-[#06101d] mb-6 tracking-tight">1. What are Cookies?</h2>
                            <p className="text-gray-700 mb-8 font-normal leading-relaxed">
                                Cookies are small text files stored on your browser or device by web servers. They allow the website to recognize your device, remember search terms, persist login sessions, and track traffic statistics to help optimize page speeds and layout performance.
                            </p>

                            <h2 className="text-3xl font-bold text-[#06101d] mb-6 tracking-tight">2. The Categories of Cookies We Set</h2>
                            <p className="text-gray-700 mb-4 font-normal leading-relaxed">
                                We place first-party and third-party cookies on your device for the following reasons:
                            </p>
                            <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-3 font-normal leading-relaxed">
                                <li><strong>Essential Cookies:</strong> Critical for operating the user authentication session and utilizing core interactive modules like the contact forms. Disabling these will prevent correct form submissions.</li>
                                <li><strong>Analytical & Metrics Cookies:</strong> We use web analytics tools (like Google Analytics) to measure visitor counts, LCP/CLS rendering times, and traffic source channels. This allows us to improve website loading speeds and performance.</li>
                                <li><strong>Functional Preferences:</strong> Used to remember your choice parameters, dark/light theme options, or dynamic filters applied to our services and blogs.</li>
                            </ul>

                            <h2 className="text-3xl font-bold text-[#06101d] mb-6 tracking-tight">3. Managing and Deleting Cookies</h2>
                            <p className="text-gray-700 mb-8 font-normal leading-relaxed">
                                You can control or refuse cookies by adjusting your web browser settings. Most browsers allow you to block all cookies, accept only first-party cookies, or clear history upon exit. Note that blocking essential cookies may break core website forms and dashboard sessions.
                            </p>

                            <h2 className="text-3xl font-bold text-[#06101d] mb-6 tracking-tight">4. Privacy Context</h2>
                            <p className="text-gray-700 mb-8 font-normal leading-relaxed">
                                Cookie datasets are primarily compiled as anonymous telemetry. Any personal identifiers collected via cookies are governed under our standard <a href="/privacy-policy" className="text-purple-600 font-bold hover:underline">Privacy Policy</a>.
                            </p>

                            <h2 className="text-3xl font-bold text-[#06101d] mb-6 tracking-tight">5. Contact Support</h2>
                            <p className="text-gray-700 mb-8 font-normal leading-relaxed">
                                For inquiries relating to this policy:
                            </p>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <p className="font-bold text-[#06101d]">Email: support@algoforceaii.com</p>
                                <p className="text-slate-600 font-bold italic mt-1">Subject: Cookie Consent Query</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default CookiePolicy
