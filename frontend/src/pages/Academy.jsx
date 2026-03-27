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
                <title>AlgoForce Academy – Professional AI Development Courses & Certification | AlgoForce AI</title>
                <meta name="description" content="AlgoForce Academy offers hands-on courses in AI product engineering, MERN development, and prompt engineering. Build career-ready skills with mentored projects and certifications." />
                <link rel="canonical" href="https://www.algoforceaii.com/academy" />
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
