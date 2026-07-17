import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import { FaEnvelope, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa"

const teamMembers = [
  {
    name: "Dev N Suman",
    role: "Founder & CEO",
    department: "Leadership",
    location: "New Delhi",
    photo: "",
    bio: "Building AlgoForce as an AI Software Company across ready-to-use software products, Labs talent training, and the Crucible platform.",
    linkedin: "https://www.linkedin.com/in/dev-n-suman-3616a6377/",
    email: "af@algoforceaii.com",
  },
  {
    name: "Chief Marketing Officer",
    role: "CMO",
    department: "Growth & Brand",
    location: "New Delhi",
    photo: "",
    bio: "Leads product positioning, subscription campaigns, collaborations, and market growth for AlgoForce software.",
    linkedin: "https://www.linkedin.com/company/algoforceofficial/",
    email: "af@algoforceaii.com",
  },
  {
    name: "Chief Financial Officer",
    role: "CFO",
    department: "Finance & Governance",
    location: "New Delhi",
    photo: "",
    bio: "Oversees financial planning, revenue visibility, budgets, reporting discipline, and business governance across the company.",
    linkedin: "https://www.linkedin.com/company/algoforceofficial/",
    email: "af@algoforceaii.com",
  },
  {
    name: "Chief Operating Officer",
    role: "COO",
    department: "Operations",
    location: "New Delhi",
    photo: "",
    bio: "Coordinates delivery processes, team operations, client workflows, and day-to-day organizational performance.",
    linkedin: "https://www.linkedin.com/company/algoforceofficial/",
    email: "af@algoforceaii.com",
  },
  {
    name: "Chief Experience Officer",
    role: "CXO",
    department: "Client Experience",
    location: "New Delhi",
    photo: "",
    bio: "Owns client experience, service quality, stakeholder communication, and the premium feel of every AlgoForce interaction.",
    linkedin: "https://www.linkedin.com/company/algoforceofficial/",
    email: "af@algoforceaii.com",
  },
  {
    name: "Executive Assistant",
    role: "Executive Office",
    department: "Founder Support",
    location: "New Delhi",
    photo: "",
    bio: "Supports leadership communication, scheduling, follow-ups, internal coordination, and priority management for the executive office.",
    linkedin: "https://www.linkedin.com/company/algoforceofficial/",
    email: "af@algoforceaii.com",
  },
]

const TeamPhoto = ({ member }) => {
  const initials = member.name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-[#eef2f7] border border-[#06101d]/10">
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name}
          className="relative z-10 h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.style.display = "none"
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_15%,rgba(143,56,255,0.12),transparent_18rem),linear-gradient(180deg,#f8fafc,#e9eef5)]">
          <span className="text-5xl font-semibold text-[#06101d]/20">{initials}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(6,16,29,0.68))]" />
      <div className="absolute left-4 right-4 bottom-4 z-20">
        <span className="inline-flex rounded-full border border-white/20 bg-white/16 px-3 py-1 text-[10px] font-semibold uppercase text-white backdrop-blur-xl">
          {member.department}
        </span>
      </div>
    </div>
  )
}

const Team = () => {
  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#06101d]">
      <Helmet>
        <title>Meet Our Team | AlgoForce</title>
        <meta
          name="description"
          content="Meet the AlgoForce team behind our ready-to-use software products, Labs talent training, and Crucible platform."
        />
        <link rel="canonical" href="https://www.algoforceaii.com/team" />
      </Helmet>

      <section className="relative overflow-hidden border-b border-[#06101d]/8 bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-12rem] right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#8f38ff]/10 blur-[90px]" />
          <div className="absolute bottom-[-12rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-[#062f4f]/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#06101d]/10 bg-[#f7f9fc] px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8f38ff]" />
                <span className="text-[10px] font-semibold uppercase text-slate-500">Meet Our Team</span>
              </div>
              <h1 className="mb-6 max-w-4xl text-[2.55rem] sm:text-5xl md:text-6xl lg:text-[4.75rem] font-bold leading-[1.04]">
                Meet the people leading AlgoForce.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.75 }}
              className="rounded-[28px] border border-[#06101d]/10 bg-white/80 p-6 md:p-8 shadow-[0_24px_70px_rgba(6,47,79,0.08)] backdrop-blur-xl"
            >
              <p className="text-base md:text-lg leading-relaxed text-slate-600">
                AlgoForce is built by a focused team working across AI product development, database engineering, Labs talent development, and client delivery.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-[#06101d]/10 pt-6">
                {[
                  ['6', 'Core Roles'],
                  ['3', 'Business Units'],
                  ['1', 'Execution Standard']
                ].map(([value, label]) => (
                  <div key={label}>
                    <div className="text-2xl font-bold text-[#06101d]">{value}</div>
                    <div className="text-[10px] font-semibold uppercase text-slate-400">{label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-start gap-3 text-sm font-semibold text-slate-500">
                <FaMapMarkerAlt className="mt-0.5 text-[#8f38ff]" />
                <span>Office: South Delhi, Kalkaji, New Delhi 110019</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-6 py-14 md:py-20">
        <div className="mb-10 md:mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase text-[#8f38ff]">Team Directory</p>
            <h2 className="text-3xl md:text-4xl font-bold">Leadership and core contributors</h2>
          </div>
          <p className="max-w-xl text-sm md:text-base leading-relaxed text-slate-500">
            A focused group of builders, operators, and specialists supporting the company and its clients.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08 }}
              className="group overflow-hidden rounded-[30px] border border-[#06101d]/10 bg-white p-4 shadow-[0_24px_70px_rgba(6,47,79,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(6,47,79,0.14)]"
            >
              <TeamPhoto member={member} />

              <div className="p-3 pt-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold">{member.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-[#8f38ff]">{member.role}</p>
                  <p className="mt-2 text-xs font-semibold uppercase text-slate-400">{member.location}</p>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-slate-600">{member.bio}</p>
                <div className="flex flex-wrap gap-3">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#06101d]/10 px-4 py-2 text-xs font-bold text-[#06101d] transition-colors hover:border-[#8f38ff]/40 hover:text-[#8f38ff]"
                    >
                      <FaLinkedin /> LinkedIn
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-2 rounded-full border border-[#06101d]/10 px-4 py-2 text-xs font-bold text-[#06101d] transition-colors hover:border-[#8f38ff]/40 hover:text-[#8f38ff]"
                    >
                      <FaEnvelope /> Email
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-6 pb-16 md:pb-24">
        <div className="rounded-[30px] border border-[#06101d]/10 bg-[#06101d] p-7 md:p-10 text-white">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase text-purple-300">Culture</p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">Quiet execution, high standards.</h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-slate-300">
              AlgoForce values disciplined product implementation, high performance metrics, and reliable delivery of specialized copilots.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Team
