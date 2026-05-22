import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SeoHead from "../components/common/SeoHead";

const Founder = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-28 pb-20">
      <SeoHead path="/founder" />
      <Helmet>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Dev N Suman",
              "jobTitle": "Founder & CEO",
              "worksFor": {
                "@type": "Organization",
                "name": "AlgoForce AI",
                "url": "https://www.algoforceaii.com"
              },
              "url": "https://www.algoforceaii.com/founder",
              "sameAs": [
                "https://www.linkedin.com/in/dev-n-suman-3616a6377/",
                "https://www.algoforceaii.com/founder"
              ]
            }
          `}
        </script>
      </Helmet>

      <div className="max-w-5xl mx-auto px-6 space-y-16">
        <section className="text-center space-y-6">
          <p className="text-[11px] uppercase tracking-[0.35em] text-purple-400 font-bold">
            Meet the Founder
          </p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Dev N Suman - Founder & CEO of AlgoForce AI
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Dev N Suman leads AlgoForce AI as a full-stack AI growth ecosystem combining premium consulting, AlgoForce Labs education, and Crucible founder incubation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="https://www.linkedin.com/in/dev-n-suman-3616a6377/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest shadow-lg hover:translate-y-[-2px] transition-transform"
            >
              Connect with Dev on LinkedIn
            </a>
            <a
              href="https://www.algoforceaii.com/"
              className="px-8 py-4 rounded-full border border-white/20 text-white font-bold uppercase tracking-widest hover:border-white/50 transition-colors"
            >
              Explore AlgoForce AI
            </a>
          </div>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-3xl p-10 space-y-6 leading-relaxed text-gray-200">
          <h2 className="text-2xl font-extrabold text-white">The Ecosystem Story</h2>
          <p>
            Dev N Suman is building AlgoForce AI as a three-engine company: AlgoForce AI Core for services, AlgoForce Labs for talent, and Crucible for founders.
          </p>
          <p>
            The mission is to give businesses AI execution, give professionals job-ready AI capability, and give founders a serious community for validation, demo days, and investor readiness.
          </p>
          <p>
            With a background in technology and a builder-first mindset, Dev shaped the model so every service, course, hackathon, SaaS product, and startup relationship strengthens the same flywheel.
          </p>
          <p>
            AlgoForce AI today covers consulting retainers, project-based AI delivery, Labs cohorts, apprenticeships, Crucible hackathons, founder memberships, SaaS products, and venture pipeline.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            <Link to="/academy" className="text-purple-400 font-bold underline">Explore Academy</Link>
            <Link to="/ai-builder" className="text-purple-400 font-bold underline">Try AI Builder</Link>
            <Link to="/labs" className="text-purple-400 font-bold underline">Visit Labs</Link>
            <a href="https://crucible-website-omega.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-bold underline">Enter Crucible</a>
            <Link to="/blog/dev-suman-algoforce-ai-founder-story" className="text-purple-400 font-bold underline">Read the Founder Story</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Founder;
