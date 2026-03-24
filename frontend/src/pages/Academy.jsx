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
                <title>AlgoForce Labs – Learn AI & Product Engineering</title>
                <meta name="description" content="Build real AI products. AlgoForce Labs offers hands-on courses, live workshops, and mentorship for builders and engineers." />
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
