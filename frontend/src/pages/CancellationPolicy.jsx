import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import PageVideoBackdrop from '../components/common/PageVideoBackdrop'

const CancellationPolicy = () => {
    return (
        <>
            <Helmet>
                <title>Cancellation & Termination Policy | AlgoForce AI</title>
                <meta
                    name="description"
                    content="Cancellation, cancellation refunds, and project termination policy for AlgoForce AI systems, custom software engineering, and consulting services."
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
                                Cancellation <span className="gradient-text bg-gradient-to-r from-purple-400 to-blue-400">& Termination</span>
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
                            <h2 className="text-3xl font-bold text-[#06101d] mb-6 tracking-tight">Project and Retainer Cancellation</h2>
                            <p className="text-gray-700 mb-8 font-normal leading-relaxed">
                                At AlgoForce AI, we provide high-grade custom software systems, business automation pipelines, and engineering retainers. Since our work involves dedicated engineering sprints and server allocations, cancellations and terminations are governed by the terms below.
                            </p>

                            <h2 className="text-3xl font-bold text-[#06101d] mb-6 tracking-tight">1. Custom Software & Integration Projects</h2>
                            <p className="text-gray-700 mb-4 font-normal leading-relaxed">
                                For custom AI development, ERP integrations, and software setups, project timelines are divided into milestone stages:
                            </p>
                            <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2 font-normal leading-relaxed">
                                <li><strong>Pre-Development Stage:</strong> You may cancel a project within 48 hours of signing the initial contract or service agreement. A full refund of the project advance, minus a 10% administrative and discovery audit setup fee, will be processed.</li>
                                <li><strong>In-Development Stage:</strong> Once engineering sprints or database architecture designs have commenced, project cancellation is subject to a milestone payout. You will be billed for all work completed up to the date of formal cancellation, and any remaining balance of the stage deposit will be refunded.</li>
                                <li><strong>Post-Delivery Stage:</strong> Once UAT (User Acceptance Testing) has been signed off and systems are integrated, cancellations are not eligible for refunds.</li>
                            </ul>

                            <h2 className="text-3xl font-bold text-[#06101d] mb-6 tracking-tight">2. Monthly Consulting & SLA Retainers</h2>
                            <p className="text-gray-700 mb-4 font-normal leading-relaxed">
                                For ongoing advisory, prompt-tuning support, and system maintenance retainers:
                            </p>
                            <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2 font-normal leading-relaxed">
                                <li>You may cancel your monthly retainer by providing a <strong>30-day written notice</strong> via email to our support team at <a href="mailto:af@algoforceaii.com" className="text-purple-600 font-bold hover:underline">af@algoforceaii.com</a>.</li>
                                <li>Services and pipeline monitoring will continue throughout the 30-day notice window, and you will be billed standard monthly costs for that final month.</li>
                                <li>We do not offer pro-rated refunds for cancellations made mid-billing cycle.</li>
                            </ul>

                            <h2 className="text-3xl font-bold text-[#06101d] mb-6 tracking-tight">3. Termination by AlgoForce AI</h2>
                            <p className="text-gray-700 mb-8 font-normal leading-relaxed">
                                We reserve the right to suspend or terminate service delivery, pipeline runs, or API access immediately under the following circumstances:
                                <ul className="list-disc pl-6 mt-3 space-y-2">
                                    <li>Material breach of the service contract or terms of service.</li>
                                    <li>Failure to make scheduled milestone payments within 14 business days of invoice due dates.</li>
                                    <li>Attempted reverse-engineering, unauthorized copying, or copyright infringement of proprietary AlgoForce integration middleware code.</li>
                                </ul>
                            </p>

                            <h2 className="text-3xl font-bold text-[#06101d] mb-6 tracking-tight">4. Process for Requesting Cancellation</h2>
                            <p className="text-gray-700 mb-8 font-normal leading-relaxed">
                                To cancel a custom project, monthly consulting agreement, or API pipeline access:
                            </p>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <p className="font-bold text-[#06101d]">Email: af@algoforceaii.com</p>
                                <p className="text-slate-600 font-bold italic mt-1">Subject: Cancellation Request - [Company Name] - [Project Name]</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default CancellationPolicy
