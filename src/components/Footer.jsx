import { useState, useEffect } from "react"

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <footer className="relative bg-black text-gray-400 border-t border-white/10 py-16 px-6 overflow-hidden">

      {/* Ambient Glow */}
      <div className="absolute w-72 h-72 bg-purple-600/10 blur-[120px] rounded-full -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-72 h-72 bg-blue-600/10 blur-[120px] rounded-full bottom-0 right-0 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-3 gap-12">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Blantyre Dev Summit 2026
          </h3>
          <p className="text-sm leading-relaxed">
            A concept hybrid tech summit experience exploring UI design,
            interaction, and immersive web development.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-medium mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-purple-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/speakers" className="hover:text-purple-400 transition">
                Speakers
              </a>
            </li>
            <li>
              <a href="/schedule" className="hover:text-purple-400 transition">
                Schedule
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-purple-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Project / Source */}
        <div>
          <h4 className="text-white font-medium mb-4">Project</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://github.com/YOUR_GITHUB_LINK"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition"
              >
                View Source Code
              </a>
            </li>
            <li>
              <span className="text-gray-500">
                Concept UI Project
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="relative mt-12 pt-6 border-t border-white/10 text-center text-xs text-gray-500">
        © 2026 Blantyre Dev Summit · Designed & Developed by [Sly Munthali]
      </div>

      {/* Scroll To Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full 
                     bg-linear-to-r from-purple-500 to-blue-500
                     flex items-center justify-center
                     text-white text-xl shadow-lg
                     hover:scale-110 transition-all duration-300"
        >
          ↑
        </button>
      )}

    </footer>
  )
}