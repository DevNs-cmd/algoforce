import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCalendar, FaUser, FaClock, FaArrowRight } from 'react-icons/fa'

const BLOG_POSTS = [
    {
        id: 'ai-automation-for-small-business',
        title: 'AI Automation Services for Small Business: A 2025 Growth Guide',
        excerpt: 'Discover how small businesses are leveraging AI automation to reduce operational costs by 40% and scale 10x faster.',
        date: 'March 25, 2025',
        author: 'Dev N Suman',
        readTime: '8 min read',
        category: 'Automation',
        image: '/blog/automation.jpg'
    },
    {
        id: 'custom-ai-development-company',
        title: 'Choosing a Custom AI Development Company: What Founders Must Know',
        excerpt: 'Not all AI agencies are equal. Learn the key criteria for selecting an execution partner that delivers real business value.',
        date: 'March 20, 2025',
        author: 'AlgoForce Team',
        readTime: '12 min read',
        category: 'Development',
        image: '/blog/dev.jpg'
    },
    {
        id: 'how-to-automate-business-processes',
        title: 'How to Automate Business Processes with AI in 5 Simple Steps',
        excerpt: 'A comprehensive roadmap to identifying friction in your business and eliminating it with custom AI workflow automation.',
        date: 'March 15, 2025',
        author: 'Dev N Suman',
        readTime: '10 min read',
        category: 'Strategy',
        image: '/blog/process.jpg'
    },
    {
        id: 'algorithmic-ai-solutions-for-enterprises',
        title: 'Algorithmic AI Solutions for Enterprises: Scaling Revenue In 2025',
        excerpt: 'How Fortune 500 companies are using algorithmic intelligence to optimize supply chains and customer acquisition.',
        date: 'March 10, 2025',
        author: 'AlgoForce Strategy',
        readTime: '15 min read',
        category: 'Enterprise',
        image: '/blog/enterprise.jpg'
    },
    {
        id: 'ai-consulting-services-2025',
        title: 'Top AI Consulting Services in 2025: Navigating the Intelligence Revolution',
        excerpt: 'Why consulting is the first step toward successful AI integration and how to avoid common implementation pitfalls.',
        date: 'March 5, 2025',
        author: 'Dev N Suman',
        readTime: '7 min read',
        category: 'Consulting',
        image: '/blog/consulting.jpg'
    }
];

const Blog = () => {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white pt-32 pb-20 selection:bg-purple-500/30">
            <Helmet>
                <title>AlgoForce AI Blog | Insights on AI Automation & Product Engineering</title>
                <meta name="description" content="Stay updated with the latest trends in AI automation, custom software development, and digital growth strategies from the AlgoForce team." />
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
