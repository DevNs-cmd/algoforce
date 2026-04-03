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
            Dev N Suman — Founder & CEO of AlgoForce AI
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Dev N Suman leads AlgoForce AI, an Indian platform that teaches artificial intelligence through hands-on courses and helps early-stage startups build their MVPs with AI-powered tools, expert guidance, and a builder-first mindset.
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
          <h2 className="text-2xl font-extrabold text-white">The Story</h2>
          <p>
            Dev N Suman is the founder and CEO of AlgoForce AI, an Indian AI platform that helps students learn artificial intelligence through hands-on courses and helps early-stage startups build their MVPs with AI-powered tools and expert guidance.
          </p>
          <p>
            Dev started AlgoForce AI with a mission to make AI education accessible to every student in India and to help the next generation of founders build faster, smarter, and leaner using AI.
          </p>
          <p>
            With a background in technology and a deep passion for building real-world AI products, Dev has helped multiple startups go from idea to working product through AlgoForce AI's Labs and consulting services.
          </p>
          <p>
            AlgoForce AI today offers AI courses, an AI builder platform, startup MVP development, and a growing community of students and founders across India.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            <Link to="/academy" className="text-purple-400 font-bold underline">Explore Academy</Link>
            <Link to="/ai-builder" className="text-purple-400 font-bold underline">Try AI Builder</Link>
            <Link to="/labs" className="text-purple-400 font-bold underline">Visit Labs</Link>
            <Link to="/blog/dev-suman-algoforce-ai-founder-story" className="text-purple-400 font-bold underline">Read the Founder Story</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Founder;
