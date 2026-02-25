import { useEffect, useState } from "react"

const scheduleData = [
  {
    day: "Day 1",
    date: "June 18",
    sessions: [
      { time: "08:30 AM", type: "chair", title: "Chairman's Welcome Address", speaker: "Dr. L. Kamwendo" },
      { time: "09:00 AM", type: "keynote", title: "Opening Keynote: The State of African Tech", speaker: "Thoko Banda" },
      {
        time: "11:00 AM",
        type: "symposium",
        title: "Symposium: Scaling Digital Infrastructure",
        speaker: "Industry Leaders Forum",
        details: [
          { name: "Grace Mwale", topic: "5G Deployment Across Southern Africa" },
          { name: "Peter Zulu", topic: "Cloud Adoption in Emerging Markets" },
          { name: "Nandi Phiri", topic: "Rural Connectivity Solutions" },
        ],
      },
      { time: "12:30 PM", type: "break", title: "Lunch Break", speaker: "Networking & Refreshments" },
      { time: "03:30 PM", type: "panel", title: "Panel: Women Leading in Tech", speaker: "Moderated Discussion" },
    ],
  },
  {
    day: "Day 2",
    date: "June 19",
    sessions: [
      { time: "09:00 AM", type: "keynote", title: "Keynote: AI & The African Ecosystem", speaker: "James Mvula" },
      { time: "10:45 AM", type: "debate", title: "Debate: Regulation vs Innovation in Fintech", speaker: "Policy & Tech Experts" },
      { time: "12:30 PM", type: "break", title: "Lunch Break", speaker: "Networking & Refreshments" },
      {
        time: "03:00 PM",
        type: "symposium",
        title: "Developer Symposium: Open Source in Africa",
        speaker: "Community Leaders",
        details: [
          { name: "Kelvin Banda", topic: "Open Source Sustainability" },
          { name: "Mary Jere", topic: "Building Dev Communities" },
          { name: "Tapiwa Ncube", topic: "Contributing to Global Projects" },
        ],
      },
    ],
  },
  {
    day: "Day 3",
    date: "June 20",
    sessions: [
      { time: "09:30 AM", type: "fireside", title: "Fireside Chat: Future of Fintech", speaker: "James Mvula" },
      { time: "12:30 PM", type: "break", title: "Lunch Break", speaker: "Networking & Refreshments" },
      { time: "01:30 PM", type: "showcase", title: "Innovation Showcase: AI & Climate Tech", speaker: "Selected Innovators" },
      { time: "04:30 PM", type: "chair", title: "Chairman's Closing Remarks", speaker: "Dr. L. Kamwendo" },
    ],
  },
]

export default function Schedule() {
  const [loaded, setLoaded] = useState(false)
  const [openSession, setOpenSession] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setLoaded(true)

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.body.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)
    }

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section className="relative min-h-screen bg-black text-white py-24 px-6 overflow-hidden">

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-linear-to-r from-purple-500 to-blue-500 z-50 transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Subtle Mouse Glow */}
      <div
        className="pointer-events-none fixed w-150 h-150 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)",
          left: mousePos.x - 300,
          top: mousePos.y - 300,
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">

        <h1 className="text-4xl md:text-5xl font-bold text-center mb-20">
          Summit Schedule
        </h1>

        <div className="space-y-24">
          {scheduleData.map((dayItem, dayIndex) => (
            <div key={dayIndex}>

              <div className="mb-10">
                <h2 className="text-2xl font-bold">{dayItem.day}</h2>
                <p className="text-gray-400 text-sm">{dayItem.date}</p>
              </div>

              <div className="relative border-l border-white/10 space-y-16">

                {/* Animated vertical glow line */}
                <div className="absolute left-0 top-0 w-px h-full bg-linear-to-b from-purple-500/30 via-blue-500/20 to-transparent animate-pulse" />

                {dayItem.sessions.map((session, index) => {
                  const sessionKey = `${dayIndex}-${index}`
                  const isOpen = openSession === sessionKey

                  return (
                    <div
                      key={index}
                      className={`relative pl-10 transition-all duration-700 ease-out ${
                        loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                      }`}
                      style={{ transitionDelay: `${index * 0.12}s` }}
                    >
                      {/* Timeline Dot */}
                      <div
                        className={`absolute -left-2 top-1 w-4 h-4 rounded-full ${
                          session.type === "break"
                            ? "bg-gray-600"
                            : "bg-linear-to-br from-purple-500 to-blue-500"
                        }`}
                      />

                      {/* Time + Badge */}
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-sm text-purple-400">
                          {session.time}
                        </p>

                        {session.type !== "break" && (
                          <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300 uppercase tracking-wide">
                            {session.type}
                          </span>
                        )}
                      </div>

                      {/* Clickable Header */}
                      <div
                        className={`flex justify-between gap-4 ${
                          session.type === "symposium" ? "cursor-pointer group" : ""
                        }`}
                        onClick={() =>
                          session.type === "symposium"
                            ? setOpenSession(isOpen ? null : sessionKey)
                            : null
                        }
                      >
                        <div>
                          <h3
                            className={`text-xl font-semibold mb-1 transition ${
                              session.type === "break"
                                ? "text-gray-400 italic"
                                : session.type === "symposium"
                                ? "group-hover:text-purple-400"
                                : ""
                            }`}
                          >
                            {session.title}
                          </h3>

                          <p className="text-gray-400 text-sm">
                            {session.speaker}
                          </p>
                        </div>

                        {session.type === "symposium" && (
                          <div
                            className={`transition-transform duration-300 ${
                              isOpen ? "rotate-180 text-purple-400" : "text-gray-500"
                            }`}
                          >
                            ▼
                          </div>
                        )}
                      </div>

                      {/* Expandable Content */}
                      {session.type === "symposium" && (
                        <div
                          className={`overflow-hidden transition-all duration-500 ${
                            isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="ml-2 pl-4 border-l border-white/10 space-y-3">
                            {session.details.map((detail, i) => (
                              <div key={i}>
                                <p className="text-sm font-medium text-white">
                                  {detail.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {detail.topic}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  )
                })}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}