import { Helmet } from "react-helmet-async"
import AcademyHero from '../components/sections/academy/AcademyHero'
import FeatureStrip from '../components/sections/academy/FeatureStrip'
import CourseCategories from '../components/sections/academy/CourseCategories'
import FeaturedCourses from '../components/sections/academy/FeaturedCourses'
import LiveWorkshops from '../components/sections/academy/LiveWorkshops'
import Webinars from '../components/sections/academy/Webinars'
import LearningPaths from '../components/sections/academy/LearningPaths'
import Testimonials from '../components/sections/academy/AcademyTestimonials'
import FinalCTA from '../components/sections/academy/AcademyFinalCTA'
import PaymentGateway from '../components/sections/academy/PaymentGateway'

const Academy = () => {
    return (
        <>
            <Helmet>
                <title>AlgoForce Academy – Professional AI Product Engineering</title>
                <meta name="description" content="Build career-ready skills with AlgoForce Academy. Hands-on AI product engineering, MERN development, and mentored projects for top-tier certifications." />
                <link rel="canonical" href="https://www.algoforceaii.com/academy" />
                <script type="application/ld+json">
                {`
                    {
                        "@context": "https://schema.org",
                        "@type": "EducationalOrganization",
                        "name": "AlgoForce Academy",
                        "description": "Premium industrial training and AI product development bootcamp (Step-by-Step 2026).",
                        "url": "https://www.algoforceaii.com/academy",
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.9",
                            "reviewCount": "512"
                        }
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://www.algoforceaii.com"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Academy",
                                "item": "https://www.algoforceaii.com/academy"
                            }
                        ]
                    }
                `}
                </script>
                <meta property="og:title" content="AlgoForce Academy – Master AI & Product Engineering" />
                <meta property="og:description" content="Comprehensive courses and mentorship for AI builders and full-stack developers." />
                <meta property="og:image" content="https://www.algoforceaii.com/og-academy.png" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            <div className="overflow-x-hidden pt-20 animate-moving-gradient">
                <AcademyHero />
                <FeatureStrip />
                <CourseCategories />
                <FeaturedCourses />
                <LiveWorkshops />
                <Webinars />
                <LearningPaths />
                <PaymentGateway />
                <Testimonials />
                <FinalCTA />
            </div>
        </>
    )
}

export default Academy
