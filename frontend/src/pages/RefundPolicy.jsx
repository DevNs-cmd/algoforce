import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'

const RefundPolicy = () => {
    return (
        <>
            <Helmet>
                <title>Refund & Cancellation Policy – AlgoForce</title>
                <meta
                    name="description"
                    content="Refund and cancellation policy for AlgoForce digital products and services."
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
                                Refund <span className="gradient-text bg-gradient-to-r from-purple-400 to-blue-400">Policy</span>
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
                            <h2 className="text-3xl font-bold text-navy-900 mb-6">1. Digital Products Policy</h2>
                            <p className="text-gray-700 mb-8">
                                Due to the nature of digital products (AI tools, courses, and SaaS subscriptions), all purchases are generally non-refundable once access has been granted or the service has been initiated.
                            </p>

                            <h2 className="text-3xl font-bold text-navy-900 mb-6">2. Eligibility for Refunds</h2>
                            <p className="text-gray-700 mb-4">
                                Refunds may be considered under the following specific circumstances:
                            </p>
                            <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
                                <li><strong>Duplicate Payments:</strong> If you were charged twice for the same transaction due to a technical error.</li>
                                <li><strong>Technical Payment Failures:</strong> Transactions where payment was deducted but the service was not activated/delivered.</li>
                                <li><strong>Service Not Delivered:</strong> Failure on our part to provide the service or product as described in the service agreement.</li>
                            </ul>

                            <h2 className="text-3xl font-bold text-navy-900 mb-6">3. Processing Timeline</h2>
                            <p className="text-gray-700 mb-8">
                                Once a refund request is approved, the amount will be credited back to the original payment method within <strong>7–10 working days</strong>, depending on the bank's processing time.
                            </p>

                            <h2 className="text-3xl font-bold text-navy-900 mb-6">4. How to Request a Refund</h2>
                            <p className="text-gray-700 mb-8">
                                To request a refund, please email our support team with your transaction details and reason for the request.
                            </p>

                            <div className="bg-navy-50 p-8 rounded-2xl border border-navy-100 mt-12">
                                <h3 className="text-xl font-bold text-navy-900 mb-4 text-center">Contact Support for Refunds</h3>
                                <div className="flex flex-col items-center">
                                    <p className="text-2xl font-bold text-purple-700 mb-2">support@algoforceaii.com</p>
                                    <p className="text-gray-600">Please include "Refund Request - [Order ID]" in the subject line.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default RefundPolicy
