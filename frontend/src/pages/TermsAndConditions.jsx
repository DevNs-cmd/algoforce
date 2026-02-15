import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'

const TermsAndConditions = () => {
    return (
        <>
            <Helmet>
                <title>Terms & Conditions – AlgoForce</title>
                <meta
                    name="description"
                    content="Terms and Conditions for using AlgoForce services, tools, and website."
                />
            </Helmet>

            <div className="min-h-screen pt-24 bg-white">
                {/* Header */}
                <section className="py-16 text-white bg-gradient-to-br from-navy-900 via-purple-900 to-navy-900">
                    <div className="px-6 mx-auto text-center max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
                                Terms & <span className="gradient-text bg-gradient-to-r from-purple-400 to-blue-400">Conditions</span>
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
                            <h2 className="text-3xl font-bold text-navy-900 mb-6">1. Acceptance of Terms</h2>
                            <p className="text-gray-700 mb-8">
                                By accessing or using the AlgoForce website and services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you must not use our services.
                            </p>

                            <h2 className="text-3xl font-bold text-navy-900 mb-6">2. Use of Services</h2>
                            <p className="text-gray-700 mb-4">
                                AlgoForce provides AI tools, business courses, and SaaS products ("Services"). You agree to use these services only for lawful purposes and in accordance with these terms.
                            </p>
                            <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
                                <li>You must be at least 18 years old to use our services.</li>
                                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                                <li>You agree not to modify, distribute, or reverse engineer any part of our AI tools or SaaS products.</li>
                            </ul>

                            <h2 className="text-3xl font-bold text-navy-900 mb-6">3. Intellectual Property</h2>
                            <p className="text-gray-700 mb-8">
                                All content, trademarks, logos, and intellectual property on this website, including but not limited to AI algorithms, course materials, and software, are the property of AlgoForce or its licensors. You are granted a limited, non-exclusive license to use the services for your business purposes.
                            </p>

                            <h2 className="text-3xl font-bold text-navy-900 mb-6">4. Limitation of Liability</h2>
                            <p className="text-gray-700 mb-8">
                                AlgoForce shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, including but not limited to loss of profits, data, or business opportunities. Our total liability for any claim shall not exceed the amount paid by you for the specific service in question.
                            </p>

                            <h2 className="text-3xl font-bold text-navy-900 mb-6">5. Governing Law</h2>
                            <p className="text-gray-700 mb-8">
                                These terms shall be governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in India.
                            </p>

                            <h2 className="text-3xl font-bold text-navy-900 mb-6">6. Changes to Terms</h2>
                            <p className="text-gray-700 mb-8">
                                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website. Your continued use of the services after changes are posted constitutes your acceptance of the new terms.
                            </p>

                            <div className="bg-navy-50 p-6 rounded-2xl border border-navy-100 mt-12">
                                <p className="font-bold text-navy-900">For legal inquiries, contact:</p>
                                <p className="text-navy-700 font-semibold italic">support@algoforceaii.com</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default TermsAndConditions
