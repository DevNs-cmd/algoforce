import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FaCalendar, FaUser, FaClock, FaArrowLeft, FaShareAlt, FaLinkedin, FaTwitter } from 'react-icons/fa';

// Reuse posts from Blog.jsx (Ideally this would come from a CMS or Centralized Data Store)
const BLOG_POSTS = {
    'how-to-build-ai-app-without-coding': {
        title: 'How to build AI app without coding: A 2025 Execution Guide',
        content: `
            <p>Building an AI application in 2025 no longer requires years of computer science. With the rise of the <strong>no-code AI stack</strong>, anyone can go from idea to deployment in under 2 hours.</p>
            <div class="my-10 p-10 bg-purple-600/10 border border-purple-500/20 rounded-3xl text-center">
                <h4 class="text-xl font-bold mb-4">Master No-Code AI Today</h4>
                <p class="text-gray-400 mb-8 italic">Learn to build and ship production-ready AI systems in hours.</p>
                <a href="/academy" class="inline-block px-10 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">Start Learning Now</a>
            </div>
            <h2>The Minimalist AI Stack</h2>
            <p>To build a scalable AI app, you need three components: an interface, a brain, and a bridge. We recommend using <strong>Bubble</strong> for the interface, <strong>OpenAI</strong> for the brain, and <strong>Make.com</strong> for the bridge.</p>
            <h3>Step 1: Architecting the Logic</h3>
            <p>Define what your AI needs to solve. Is it a research bot? A customer support bot? Once defined, you can use our <Link to="/build-ai-app-without-coding" class="text-purple-500 font-bold underline">No-Code Guide</Link> to connect the APIs.</p>
        `,
        date: 'March 29, 2025',
        author: 'Dev N Suman',
        readTime: '10 min read',
        category: 'Execution',
        image: '/blog/nocode.jpg',
        relatedLab: "Autonomous AI Support Agent"
    },
    'best-ai-projects-for-students': {
        title: '7 Best AI Projects for Students to Fast-Track Placements',
        content: `
            <p>Placement season in 2025 is dominated by one thing: Proof of Execution. If you can show a recruiter a live AI system you built, you are already ahead of 99% of candidates.</p>
            <div class="my-10 p-10 bg-blue-600/10 border border-blue-500/20 rounded-3xl text-center">
                <h4 class="text-xl font-bold mb-4">Build Your Placement Portfolio</h4>
                <p class="text-gray-400 mb-8 italic">Get industrial-level projects on your resume in weeks.</p>
                <a href="/academy" class="inline-block px-10 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">Start Learning Now</a>
            </div>
            <h2>The Projects</h2>
            <p>1. <strong>Autonomous Researcher:</strong> A bot that synthesizes data from 100+ sources. See it in our <Link to="/labs" class="text-purple-500 font-bold underline">Labs</Link>.</p>
            <p>2. <strong>Predictive Revenue Dashboard:</strong> Using ML to forecast sales.</p>
            <h3>Why build these?</h3>
            <p>These projects show potential employers that you understand how to implement AI strategically, not just prompt it basic questions.</p>
        `,
        date: 'March 28, 2025',
        author: 'AlgoForce Team',
        readTime: '12 min read',
        category: 'Career',
        image: '/blog/students.jpg',
        relatedLab: "Multi-Agent Research System"
    },
    'top-ai-certifications-in-india': {
        title: 'Top AI Certifications in India: Why MSME Registration Matters',
        content: `
            <p>Certification in India is often dismissed as "just paper." However, <strong>AlgoForce AI Certification</strong> is different because it is backed by industrial projects and MSME registration.</p>
            <div class="my-10 p-10 bg-emerald-600/10 border border-emerald-500/20 rounded-3xl text-center">
                <h4 class="text-xl font-bold mb-4">Earn Industrial Credentials</h4>
                <p class="text-gray-400 mb-8 italic">Govt registered MSME certificates for engineers.</p>
                <a href="/academy" class="inline-block px-10 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">Start Learning Now</a>
            </div>
            <h2>What to look for:</h2>
            <p>1. Industrial Validation. <br/> 2. Govt Registered MSME credentials. <br/> 3. Hands-on Lab access.</p>
            <p>Verify our credentials at <Link to="/ai-certification-india" class="text-purple-500 font-bold underline">Industrial Proof</Link>.</p>
        `,
        date: 'March 27, 2025',
        author: 'AlgoForce Strategy',
        readTime: '15 min read',
        category: 'Certification',
        image: '/blog/cert.jpg',
        relatedLab: "AI Voice-to-Action Bot"
    },
    'how-to-earn-using-ai-tools': {
        title: 'Efficiency as an Asset: How to Earn Using AI Tools in 2025',
        content: `
            <p>The AI economy isn't about working harder; it's about working smarter. You can become an <strong>AI Automation Consultant</strong> for local SMEs and charge for implementation, not hours.</p>
            <div class="my-10 p-10 bg-orange-600/10 border border-orange-500/20 rounded-3xl text-center">
                <h4 class="text-xl font-bold mb-4">Turn AI Skills into Revenue</h4>
                <p class="text-gray-400 mb-8 italic">Learn the monetization models that actually work.</p>
                <a href="/academy" class="inline-block px-10 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">Start Learning Now</a>
            </div>
            <h2>Models of Earning:</h2>
            <p>1. Workflow Automation. <br/> 2. Custom Bot Building. <br/> 3. AI Strategy Audits.</p>
            <p>Get the skills you need at <Link to="/ai-course" class="text-purple-500 font-bold underline">The Academy</Link>.</p>
        `,
        date: 'March 26, 2025',
        author: 'Dev N Suman',
        readTime: '14 min read',
        category: 'Revenue',
        image: '/blog/earn.jpg',
        relatedLab: "Predictive Analytics Dashboard"
    },
    'ai-tools-every-student-must-learn': {
        title: 'Top 5 AI Tools Every Student Must Learn for Industrial Impact',
        content: `
            <p>Knowledge of ChatGPT is common. Knowledge of <strong>Cursor, LangChain, and Vector Databases</strong> is rare. These are the tools that get you hired.</p>
            <div class="my-10 p-10 bg-indigo-600/10 border border-indigo-500/20 rounded-3xl text-center">
                <h4 class="text-xl font-bold mb-4">Learn Industrial AI Tools</h4>
                <p class="text-gray-400 mb-8 italic">Hands-on training with Cursor, Make, and OpenAI.</p>
                <a href="/academy" class="inline-block px-10 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">Start Learning Now</a>
            </div>
            <h2>The Student Toolkit:</h2>
            <p>1. Cursor (AI Coding) <br/> 2. Make.com (Automation) <br/> 3. Pinecone (Vector Storage)</p>
        `,
        date: 'March 25, 2025',
        author: 'AlgoForce Team',
        readTime: '8 min read',
        category: 'Tools',
        image: '/blog/tools.jpg',
        relatedLab: "Autonomous AI Support Agent"
    }
};

const BlogPost = () => {
    const { id } = useParams();
    const post = BLOG_POSTS[id];

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-6">Post Not Found</h1>
                    <Link to="/blog" className="text-purple-500 hover:text-purple-400 font-bold underline">
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-purple-500/30 pb-32">
            <Helmet>
                <title>{post.title} (Step-by-Step Guide 2026) | AlgoForce</title>
                <meta name="description" content={post.excerpt || post.title} />
                <link rel="canonical" href={`https://www.algoforceaii.com/blog/${id}`} />
                
                {/* AEO Schema (Article) */}
                <script type="application/ld+json">
                    {`
                        {
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            "headline": "${post.title}",
                            "datePublished": "${post.date}",
                            "author": {
                                "@type": "Person",
                                "name": "${post.author}"
                            },
                            "publisher": {
                                "@type": "Organization",
                                "name": "AlgoForce AI",
                                "logo": "https://www.algoforceaii.com/logo.png"
                            }
                        }
                    `}
                </script>
                {/* FAQ Schema */}
                <script type="application/ld+json">
                    {`
                        {
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "How is AlgoForce different from other AI courses?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "AlgoForce focuses on industrial execution rather than pure theory. Our students build real-world AI systems in 2-hour labs and earn Govt Registered MSME certification."
                                    }
                                }
                            ]
                        }
                    `}
                </script>
            </Helmet>

            {/* Reading Progress Indicator */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-purple-600 origin-left z-50"
                style={{ scaleX }}
            />

            <div className="max-w-4xl mx-auto px-6 pt-32 lg:pt-48">
                {/* Back Link */}
                <Link 
                    to="/blog" 
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-12 font-bold uppercase tracking-widest"
                >
                    <FaArrowLeft /> Back to Insights
                </Link>

                {/* Hero Section */}
                <header className="mb-16">
                    <div className="flex items-center gap-4 text-purple-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                        <span className="px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5">
                            {post.category}
                        </span>
                        <span>{post.readTime}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter leading-[1.1]">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-between gap-8 py-8 border-y border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center text-lg font-bold">
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-black tracking-tight">{post.author}</p>
                                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Thought Leader</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-3 text-gray-500">
                                <FaCalendar className="text-purple-600 text-[12px]" />
                                <span className="text-[12px] font-bold uppercase tracking-wider">{post.date}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="p-2 text-gray-400 hover:text-white transition-colors" title="Share on Twitter"><FaTwitter/></button>
                                <button className="p-2 text-gray-400 hover:text-white transition-colors" title="Share on LinkedIn"><FaLinkedin/></button>
                                <button className="p-2 text-gray-400 hover:text-white transition-colors" title="Copy Link"><FaShareAlt/></button>
                            </div>
                        </div>
                    </div>
                {/* Table of Contents (Engagement Boost) */}
                <div className="mb-16 p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-3xl">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-6">In This Article</h3>
                    <nav className="space-y-4">
                        <a href="#intro" className="block text-sm font-bold text-white/60 hover:text-purple-500 transition-colors italic">01. Executive Summary & Strategy</a>
                        <a href="#core" className="block text-sm font-bold text-white/60 hover:text-purple-500 transition-colors italic">02. Core Implementation Labs</a>
                        <a href="#conversion" className="block text-sm font-bold text-white/60 hover:text-purple-500 transition-colors italic">03. Monetization & Scaling</a>
                    </nav>
                </div>
            </header>

                {/* Main Content Area with Inline CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="prose prose-invert prose-purple max-w-none"
                    id="intro"
                >
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    
                    {/* Inline CTA (30% Scroll Mock) */}
                    <div id="core" className="my-16 p-10 rounded-[2.5rem] bg-gradient-to-br from-purple-600/10 to-indigo-600/5 border border-white/5 text-center">
                        <h4 className="text-2xl font-black mb-4 italic tracking-tighter">Ready to Build This?</h4>
                        <p className="text-gray-500 mb-8 italic text-sm">Join the next cohort and deploy your own industrial AI systems.</p>
                        <Link to="/academy" className="px-10 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Start Build Lab</Link>
                    </div>
                </motion.div>

                {/* Related Lab Section */}
                {post.relatedLab && (
                    <div className="mt-24 p-10 rounded-[2.5rem] bg-indigo-950/20 border border-indigo-500/10 flex flex-col md:flex-row items-center justify-between gap-8 group">
                        <div className="space-y-4 text-center md:text-left">
                            <h4 className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.4em]">Related Project in Labs</h4>
                            <h3 className="text-2xl font-black italic tracking-tighter uppercase">{post.relatedLab}</h3>
                            <p className="text-sm text-gray-500 italic max-w-sm">See how we built this industrial AI system in under 2 hours.</p>
                        </div>
                        <Link to="/labs" className="px-10 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                            View Live Demo
                        </Link>
                    </div>
                )}
                <div className="mt-24 p-12 rounded-3xl bg-white/[0.02] border border-white/5 text-center">
                    <h3 className="text-2xl font-bold mb-4">Did you enjoy this deep dive?</h3>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">Subscribe for pure tactical AI insights. No fluff, no PR, just execution.</p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-sm mx-auto">
                        <input type="text" placeholder="your@email.com" className="bg-black/40 border border-white/10 px-6 py-4 rounded-full outline-none focus:border-purple-600 flex-1"/>
                        <button className="bg-white text-black px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform">Join</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
