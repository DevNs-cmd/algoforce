import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import PageVideoBackdrop from '../components/common/PageVideoBackdrop'

const PrivacyPolicy = () => {
    return (
        <>
            <Helmet>
                <title>Privacy Policy – AlgoForce</title>
                <meta
                    name="description"
                    content="Privacy Policy for AlgoForce. Learn how we collect, use, and protect your data."
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
                            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
                                Privacy <span className="gradient-text bg-gradient-to-r from-purple-400 to-blue-400">Policy</span>
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
                            <h2 className="text-3xl font-bold text-navy-900 mb-6">Introduction</h2>
                            <p className="text-gray-700 mb-8">
                                At AlgoForce, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our AI tools, courses, and SaaS services.
                            </p>

                            <h2 className="text-3xl font-bold text-navy-900 mb-6">1. Information We Collect</h2>
                            <p className="text-gray-700 mb-4">
                                We collect information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or otherwise when you contact us.
                            </p>
                            <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
                                <li><strong>Personal Data:</strong> Name, email address, phone number, and company details.</li>
                                <li><strong>Payment Details:</strong> We collect data necessary to process your payment if you make purchases, such as your payment instrument number and the security code associated with your payment instrument. All payment data is stored by our payment processors (e.g., Stripe, Razorpay).</li>
                                <li><strong>Usage Data:</strong> Information about how you use our website and services, including your IP address, browser type, and operating system.</li>
                            </ul>

                            <h2 className="text-3xl font-bold text-navy-900 mb-6">2. How We Use Your Data</h2>
                            <p className="text-gray-700 mb-4">
                                We use the information we collect or receive for the following purposes:
                            </p>
                            <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
                                <li>To facilitate account creation and logon process.</li>
                                <li>To send administrative information to you (e.g., product updates, changes to terms).</li>
                                <li>To fulfill and manage your orders and payments.</li>
                                <li>To deliver the services and tools you have requested.</li>
                                <li>To respond to user inquiries and offer support.</li>
                                <li>To improve our services and internal analytics.</li>
                            </ul>

                            <h2 className="text-3xl font-bold text-navy-900 mb-6">3. Data Protection Statement</h2>
                            <p className="text-gray-700 mb-8">
                                We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our website is at your own risk.
                            </p>

                            <h2 className="text-3xl font-bold text-navy-900 mb-6">4. Third-Party Services</h2>
                            <p className="text-gray-700 mb-8">
                                We may use third-party services to facilitate our operations, such as payment gateways (Stripe, Razorpay), analytics providers (Google Analytics), and email marketing tools. These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                            </p>

                            <h2 className="text-3xl font-bold text-navy-900 mb-6">5. Contact Us</h2>
                            <p className="text-gray-700 mb-8">
                                If you have questions or comments about this policy, you may contact our Data Protection Officer at:
                            </p>
                            <div className="bg-navy-50 p-6 rounded-2xl border border-navy-100">
                                <p className="font-bold text-navy-900">Email: support@algoforceaii.com</p>
                                <p className="text-navy-700 font-semibold italic">Subject: Privacy Policy Inquiry</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default PrivacyPolicy
