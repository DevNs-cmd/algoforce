import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FaCalendar, FaUser, FaClock, FaArrowLeft, FaShareAlt, FaLinkedin, FaTwitter } from 'react-icons/fa';

// Reuse posts from Blog.jsx (Ideally this would come from a CMS or Centralized Data Store)
const BLOG_POSTS = {
    'ai-automation-for-small-business': {
        title: 'AI Automation Services for Small Business: A 2025 Growth Guide',
        content: `
            <p>Artificial Intelligence is no longer a luxury for big corporations. In 2025, small and medium enterprises (SMEs) are leveraging AI to automate mundane tasks, optimize marketing, and skyrocket productivity.</p>
            <h2>Why Small Businesses Need AI Now</h2>
            <p>Every hour spent on administrative tasks is an hour not spent on growth. AI automation can handle scheduling, customer service, and data analysis with 99% accuracy.</p>
            <h3>1. Customer Support via AI Chatbots</h3>
            <p>Modern chatbots can handle 80% of routine inquiries, freeing up your team for complex problem-solving.</p>
            <h3>2. Predictive Inventory Management</h3>
            <p>Don't guess what will sell. AI models analyze past trends to predict future demand.</p>
            <h2>The Cost-Benefit Analysis</h2>
            <p>Small businesses using AI automation report a 40% reduction in operational overhead within the first six months.</p>
        `,
        date: 'March 25, 2025',
        author: 'Dev N Suman',
        readTime: '8 min read',
        category: 'Automation',
        image: '/blog/automation.jpg'
    },
    // Add more posts as needed...
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
                <title>{post.title} | AlgoForce AI</title>
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
                </header>

                {/* Main Content Area */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="prose prose-invert prose-purple max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Footer / Newsletter */}
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
