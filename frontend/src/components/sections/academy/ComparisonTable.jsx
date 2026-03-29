import { motion } from 'framer-motion'
import { FaCheck, FaTimes } from 'react-icons/fa'

const ComparisonTable = () => {
    const rows = [
        { feature: "Hands-on Industrial Labs", algo: true, trad: false },
        { feature: "Build 5+ Live Projects", algo: true, trad: false },
        { feature: "MSME-Govt Certification", algo: true, trad: "Maybe" },
        { feature: "Project Execution Speed", algo: "2 Hours", trad: "Weeks" },
        { feature: "Agentic AI Skills", algo: true, trad: false },
        { feature: "Mentorship by Builders", algo: true, trad: "Professors" },
    ];

    return (
        <section className="py-20 md:py-32">
            <div className="text-center mb-16">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-600 mb-6">The Competitive Advantage</h2>
                <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter uppercase italic leading-none">
                    AlgoForce vs <br />
                    <span className="text-gray-500">Traditional Courses.</span>
                </h2>
            </div>

            <div className="rounded-[3rem] overflow-hidden border border-white/5 bg-[#111111]/40 backdrop-blur-3xl shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                            <th className="p-8 text-[12px] font-black uppercase tracking-widest text-gray-500">Feature</th>
                            <th className="p-8 text-[14px] font-black uppercase tracking-widest text-purple-500 italic text-center">AlgoForce AI</th>
                            <th className="p-8 text-[12px] font-black uppercase tracking-widest text-gray-600 text-center">Standard Courses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, idx) => (
                            <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <td className="p-8 text-sm font-bold text-gray-400 italic">{row.feature}</td>
                                <td className="p-8 text-center font-black">
                                    {row.algo === true ? (
                                        <FaCheck className="text-emerald-500 mx-auto" />
                                    ) : (
                                        <span className="text-white uppercase tracking-widest text-[11px] bg-purple-600/20 px-4 py-2 rounded-full border border-purple-500/20">{row.algo}</span>
                                    )}
                                </td>
                                <td className="p-8 text-center text-gray-600 font-medium">
                                    {row.trad === false ? (
                                        <FaTimes className="text-red-900/40 mx-auto" />
                                    ) : (
                                        <span className="text-[11px] uppercase tracking-widest opacity-50">{row.trad}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default ComparisonTable
