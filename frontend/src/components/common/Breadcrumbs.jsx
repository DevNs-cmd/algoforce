import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FaChevronRight, FaHome } from 'react-icons/fa'

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (pathnames.length === 0) return null;

    const breadcrumbListSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.algoforceaii.com/"
            },
            ...pathnames.map((value, index) => {
                const url = `https://www.algoforceaii.com/${pathnames.slice(0, index + 1).join('/')}`;
                return {
                    "@type": "ListItem",
                    "position": index + 2,
                    "name": value.charAt(0).toUpperCase() + value.slice(1),
                    "item": url
                };
            })
        ]
    };

    return (
        <div className="bg-transparent pt-32 pb-4">
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbListSchema)}
                </script>
            </Helmet>
            <nav className="max-w-7xl mx-auto px-6 flex items-center gap-4 text-[12px] font-bold uppercase tracking-widest text-gray-500">
                <Link to="/" className="hover:text-purple-600 transition-colors flex items-center gap-2">
                    <FaHome /> Home
                </Link>
                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return (
                        <div key={to} className="flex items-center gap-4">
                            <FaChevronRight className="text-[10px] text-gray-300" />
                            {last ? (
                                <span className="text-black">{value.replace('-', ' ')}</span>
                            ) : (
                                <Link to={to} className="hover:text-purple-600 transition-colors">
                                    {value.replace('-', ' ')}
                                </Link>
                            )}
                        </div>
                    );
                })}
            </nav>
        </div>
    );
};

export default Breadcrumbs;
