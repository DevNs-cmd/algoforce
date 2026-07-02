import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import PageVideoBackdrop from '../components/common/PageVideoBackdrop'

const AiPolicy = () => {
    return (
        <>
            <Helmet>
                <title>Artificial Intelligence (AI) Policy | AlgoForce AI</title>
                <meta
                    name="description"
                    content="Artificial Intelligence (AI) Policy for AlgoForce AI. Read our transparency standards on model fine-tuning, training data safety, and secure self-hosted LLM hosting."
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
                                AI & Data <span className="gradient-text bg-gradient-to-r from-purple-400 to-blue-400">Safety Policy</span>
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
                            <h2 className="text-3xl font-bold text-[#06101d] mb-6 tracking-tight">AI Deployment Standards</h2>
                            <p className="text-gray-700 mb-8 font-normal leading-relaxed">
                                At AlgoForce AI, we construct enterprise intelligence systems, database integrations, and automated pipelines. To protect corporate IP and ensure ethical, reliable execution, our operations strictly enforce the following AI safety guidelines.
                            </p>

                            <h2 className="text-3xl font-bold text-[#06101d] mb-6 tracking-tight">1. No Model Training on Proprietary Data</h2>
                            <p className="text-gray-700 mb-8 font-normal leading-relaxed">
                                We guarantee that any proprietary data, client databases, API payloads, or transaction documents passing through integrated workflows or RAG search engines will <strong>never be used to train or fine-tune public foundation models</strong>. All API connections to commercial model providers (such as OpenAI and Anthropic) are routed via enterprise agreements enforcing immediate data deletion and zero-retention policies.
                            </p>

                            <h2 className="text-3xl font-bold text-[#06101d] mb-6 tracking-tight">2. Secure Self-Hosted LLMs</h2>
                            <p className="text-gray-700 mb-8 font-normal leading-relaxed">
                                For highly regulated industries (such as Healthcare, Finance, and Government), we deploy open-source models (such as Llama-3, Mistral, or Qwen) on <strong>private cloud instances</strong> (AWS, Azure, Google Cloud VPCs). Under this setup, model execution runs entirely inside your virtual private network, ensuring complete control over access logs and data.
                            </p>

                            <h2 className="text-3xl font-bold text-[#06101d] mb-6 tracking-tight">3. Guardrails & Output Verification</h2>
                            <p className="text-gray-700 mb-8 font-normal leading-relaxed">
                                To prevent model hallucinations or formatting errors from impacting workflows:
                                <ul className="list-disc pl-6 mt-3 space-y-2">
                                    <li>We implement structured JSON validation filters to parse LLM response outputs before they write back to CRM or ERP databases.</li>
                                    <li>Automated approval queues are configured for critical workflows (e.g., generating client quotes or releasing reservation bookings) so that business operators retain control.</li>
                                    <li>Secure prompt-injection detection scripts are embedded in patient/client messaging endpoints to prevent unauthorized command overrides.</li>
                                </ul>
                            </p>

                            <h2 className="text-3xl font-bold text-[#06101d] mb-6 tracking-tight">4. Transparency & Human Agency</h2>
                            <p className="text-gray-700 mb-8 font-normal leading-relaxed">
                                We design systems to augment human productivity, not replace human judgment. AI agents qualifiers are explicitly configured to identify themselves as automated systems to clients, and always offer immediate routing to live human representatives when requested.
                            </p>

                            <h2 className="text-3xl font-bold text-[#06101d] mb-6 tracking-tight">5. Contact Security Officer</h2>
                            <p className="text-gray-700 mb-8 font-normal leading-relaxed">
                                For compliance, data sharing agreements, or system audits:
                              </p>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <p className="font-bold text-[#06101d]">Email: security@algoforceaii.com</p>
                                <p className="text-slate-600 font-bold italic mt-1">Subject: Security & Compliance Audit Inquiry</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default AiPolicy
