const FoundersVision = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-[#050814] to-black text-white overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT — Vision text */}
        <div>
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 text-sm tracking-wide">
            Founder’s Vision
          </span>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Building the <span className="text-purple-400">Intelligence Layer</span><br />
            Businesses Were Missing
          </h2>

          <p className="text-lg text-gray-300 leading-relaxed">
            AlgoForce was founded by{" "}
            <span className="font-semibold text-white">Dev N Suman</span>{" "}
            to solve a core problem modern businesses face —
            data exists everywhere, but intelligence is fragmented.
          </p>

          <p className="mt-4 text-gray-400">
            AlgoForce unifies data, reasoning, and execution into an
            AI-first Business Operating System that doesn’t just analyze —
            it <span className="text-white">decides and acts</span>.
          </p>
        </div>

        {/* RIGHT — Founder card */}
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <p className="text-sm uppercase tracking-wider text-gray-400 mb-3">
            From the Founder
          </p>

          <p className="text-lg leading-relaxed text-gray-200">
            “I believe the next generation of companies won’t be run by dashboards,
            spreadsheets, or manual decision loops —
            they’ll be run by intelligent systems that learn, adapt,
            and compound advantage automatically.”
          </p>

          <div className="mt-6">
            <p className="font-semibold text-white">Dev N Suman</p>
            <p className="text-sm text-gray-400">
              Founder & Architect, AlgoForce AI
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default FoundersVision
