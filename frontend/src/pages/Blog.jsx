import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCalendar, FaUser, FaClock, FaArrowRight } from 'react-icons/fa'
import { defaultKeywords } from "../seoConfig"

const BLOG_POSTS = [
    {
        id: 'how-to-build-ai-app-without-coding',
        title: 'How to build AI app without coding: A 2025 Execution Guide',
        excerpt: 'Build and deploy a functional AI app in under 2 hours without writing a single line of code. Learn the 2025 no-code AI stack.',
        date: 'March 29, 2025',
        author: 'Dev N Suman',
        readTime: '10 min read',
        category: 'Execution',
        image: '/blog/nocode.jpg'
    },
    {
        id: 'best-ai-projects-for-students',
        title: '7 Best AI Projects for Students to Fast-Track Placements',
        excerpt: 'From autonomous agents to predictive dashboards, build these 7 projects to secure a high-paying AI role in 2025.',
        date: 'March 28, 2025',
        author: 'Dev N Suman',
        readTime: '12 min read',
        category: 'Career',
        image: '/blog/students.jpg'
    },
    {
        id: 'top-ai-certifications-in-india',
        title: 'Top AI Certifications in India: Why MSME Registration Matters',
        excerpt: 'Navigate the crowded certification market. Discover which AI credentials actually hold value in the Indian industrial sector.',
        date: 'March 27, 2025',
        author: 'Dev N Suman',
        readTime: '15 min read',
        category: 'Certification',
        image: '/blog/cert.jpg'
    },
    {
        id: 'how-to-earn-using-ai-tools',
        title: 'Efficiency as an Asset: How to Earn Using AI Tools in 2025',
        excerpt: 'Stop being a user. Start being an executor. Learn how to monetize AI automation services for local and global clients.',
        date: 'March 26, 2025',
        author: 'Dev N Suman',
        readTime: '14 min read',
        category: 'Revenue',
        image: '/blog/earn.jpg'
    },
    {
        id: 'ai-tools-every-student-must-learn',
        title: 'Top 5 AI Tools Every Student Must Learn for Industrial Impact',
        excerpt: 'Beyond ChatGPT. Master the tools that actually define the modern AI workforce including Cursor, Make, and LangChain.',
        date: 'March 25, 2025',
        author: 'Dev N Suman',
        readTime: '8 min read',
        category: 'Tools',
        image: '/blog/tools.jpg'
    },
    {
        id: 'how-to-build-ai-startup-mvp-india',
        title: 'How to Build an AI Startup MVP in India Without Funding',
        excerpt: 'A playbook for Indian founders to validate and launch AI MVPs quickly without external capital.',
        date: 'April 3, 2026',
        author: 'Dev N Suman',
        readTime: '15 min read',
        category: 'MVP',
        image: '/blog/mvp-india.jpg'
    },
    {
        id: 'best-free-ai-courses-students-india-2026',
        title: 'Best Free AI Courses for Students in India 2026',
        excerpt: 'Curated, honest recommendations for Indian students to learn AI without breaking the bank.',
        date: 'April 3, 2026',
        author: 'Dev N Suman',
        readTime: '14 min read',
        category: 'Education',
        image: '/blog/ai-courses-2026.jpg'
    },
    {
        id: 'dev-suman-algoforce-ai-founder-story',
        title: 'How Dev N Suman Founded AlgoForce AI — Founder Story',
        excerpt: 'From student to founder: the decisions, mistakes, and systems behind building AlgoForce AI.',
        date: 'April 3, 2026',
        author: 'Dev N Suman',
        readTime: '16 min read',
        category: 'Founder',
        image: '/blog/founder-story.jpg'
    },
    {
        id: 'ai-certification-india-worth-it-2026',
        title: 'AI Certification in India 2026: Which One is Actually Worth It?',
        excerpt: 'A brutally honest comparison of certifications that move careers versus those that don’t.',
        date: 'April 3, 2026',
        author: 'Dev N Suman',
        readTime: '15 min read',
        category: 'Certification',
        image: '/blog/ai-cert-2026.jpg'
    },
    {
        id: 'earn-money-ai-tools-student-india',
        title: 'How Indian Students Can Earn Money Using AI Tools in 2026',
        excerpt: 'Real monetization paths—freelancing, automation, content ops, and niche services—powered by AI.',
        date: 'April 3, 2026',
        author: 'Dev N Suman',
        readTime: '14 min read',
        category: 'Revenue',
        image: '/blog/earn-ai-india.jpg'
    },
    {
        id: 'no-code-mvp-builder-india-startups',
        title: 'How Indian Startups Can Build Their MVP in 2 Weeks Without Code',
        excerpt: 'Use AI and no-code stacks to ship faster than traditional development.',
        date: 'April 3, 2026',
        author: 'Dev N Suman',
        readTime: '13 min read',
        category: 'No-Code',
        image: '/blog/no-code-mvp.jpg'
    },
    {
        id: 'algoforce-ai-review-platform',
        title: 'AlgoForce AI Review 2026: Honest Look at India\'s AI Platform',
        excerpt: 'A transparent review of AlgoForce AI courses, builders, labs, and founder support.',
        date: 'April 3, 2026',
        author: 'Dev N Suman',
        readTime: '12 min read',
        category: 'Review',
        image: '/blog/review-2026.jpg'
    }
];

const Blog = () => {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white pt-32 pb-20 selection:bg-purple-500/30">
            <Helmet>
                <title>AlgoForce AI Blog | AI, Automation, Marketing & Startup Growth Guides</title>
                <meta name="description" content="Read practical guides on AI automation, AI tools, digital marketing, SEO, startup MVPs, AI courses, student projects, and business growth systems." />
                <meta name="keywords" content={`${defaultKeywords}, AI blog India, automation blog, digital marketing blog, startup growth blog, SEO guides, AI tools for students`} />
                <link rel="canonical" href="https://www.algoforceaii.com/blog" />
            </Helmet>

            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <header className="mb-20 text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-600 mb-6">The Content Studio</h2>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
                            Intelligence <span className="text-gray-600 italic px-2">Unpacked.</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-medium leading-relaxed">
                            A deep dive into the engineering, strategy, and execution behind world-class AI systems.
                        </p>
                    </motion.div>
                </header>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post, i) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col group h-full bg-[#111111]/50 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-purple-500/20 transition-all duration-500"
                        >
                            <div className="aspect-[16/10] overflow-hidden relative">
                                <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                                <div className="w-full h-full bg-gray-900 animate-pulse" /> {/* Placeholder for real image */}
                                <div className="absolute top-6 left-6 z-20">
                                    <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-10 flex flex-col flex-1">
                                <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-6">
                                    <span className="flex items-center gap-2"><FaCalendar className="text-purple-600" /> {post.date}</span>
                                    <span className="flex items-center gap-2"><FaClock className="text-purple-600" /> {post.readTime}</span>
                                </div>
                                
                                <h3 className="text-2xl font-bold mb-6 group-hover:text-purple-400 transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                
                                <p className="text-gray-400 font-medium leading-relaxed mb-10 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between group/link">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center text-[12px] font-bold">
                                            {post.author.charAt(0)}
                                        </div>
                                        <span className="text-[12px] font-bold text-gray-300">{post.author}</span>
                                    </div>
                                    <Link to={`/blog/${post.id}`} className="flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-purple-500 group-hover/link:gap-4 transition-all">
                                        Read <FaArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>

            {/* Newsletter CTA */}
            <section className="mt-32 border-t border-white/5 bg-[#111111]/30 py-32">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">Stay Ahead of the Curve.</h2>
                    <p className="text-xl text-gray-400 font-medium mb-12">Get tactical AI execution guides delivered to your inbox every week. No fluff.</p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input 
                            type="email" 
                            placeholder="your@email.com" 
                            className="flex-1 px-8 py-5 rounded-full bg-white/5 border border-white/10 focus:border-purple-600 outline-none transition-all font-medium"
                        />
                        <button className="px-10 py-5 bg-white text-black rounded-full font-black text-[14px] uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all">
                            Join Now
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
