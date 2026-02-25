import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/60 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        <div className="font-bold text-lg tracking-wide">
          BDS 2026
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-wider text-gray-300">
         <NavLink
  to="/"
  className={({ isActive }) =>
    `transition-colors ${
      isActive ? "text-white" : "text-gray-300 hover:text-white"
    }`
  }
>
  Home
</NavLink>

<NavLink
  to="/speakers"
  className={({ isActive }) =>
    `transition-colors ${
      isActive ? "text-white" : "text-gray-300 hover:text-white"
    }`
  }
>
  Speakers
</NavLink>

<NavLink
  to="/schedule"
  className={({ isActive }) =>
    `transition-colors ${
      isActive ? "text-white" : "text-gray-300 hover:text-white"
    }`
  }
>
  Schedule
</NavLink>

<NavLink
  to="/contact"
  className={({ isActive }) =>
    `transition-colors ${
      isActive ? "text-white" : "text-gray-300 hover:text-white"
    }`
  }
>
  Contact
</NavLink>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        } bg-black/80 backdrop-blur-lg`}
      >
        <div className="flex flex-col items-center gap-6 py-6 uppercase tracking-wider text-sm">

  <NavLink
    to="/"
    onClick={() => setMenuOpen(false)}
    className={({ isActive }) =>
      `transition-colors ${
        isActive ? "text-white" : "text-gray-300 hover:text-white"
      }`
    }
  >
    Home
  </NavLink>

  <NavLink
    to="/speakers"
    onClick={() => setMenuOpen(false)}
    className={({ isActive }) =>
      `transition-colors ${
        isActive ? "text-white" : "text-gray-300 hover:text-white"
      }`
    }
  >
    Speakers
  </NavLink>

  <NavLink
    to="/schedule"
    onClick={() => setMenuOpen(false)}
    className={({ isActive }) =>
      `transition-colors ${
        isActive ? "text-white" : "text-gray-300 hover:text-white"
      }`
    }
  >
    Schedule
  </NavLink>

  <NavLink
    to="/contact"
    onClick={() => setMenuOpen(false)}
    className={({ isActive }) =>
      `transition-colors ${
        isActive ? "text-white" : "text-gray-300 hover:text-white"
      }`
    }
  >
    Contact
  </NavLink>

</div>
      </div>
    </nav>
  )
}