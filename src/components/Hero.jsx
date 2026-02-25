import { useNavigate } from "react-router-dom"

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-blue-950 via-purple-900 to-black text-white">

      {/* Animated Background Glow */}
      <div className="absolute w-125 h-125 bg-purple-600 rounded-full blur-[120px] opacity-30 animate-pulse -top-25 -left-25" />
      <div className="absolute w-100 h-100 bg-blue-500 rounded-full blur-[120px] opacity-20 animate-pulse -bottom-25 -right-25" />

      {/* Content */}
      <div className="relative text-center px-6 space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight animate-fadeSlideUp">
          Blantyre Dev Summit 2026
        </h1>

        <p className="text-lg md:text-2xl text-gray-300 animate-fadeSlideUp [animation-delay:0.3s] opacity-0">
          Code. Create. Connect.
        </p>

        <button
          onClick={() => navigate("/contact?intent=tickets")}
          className="px-8 py-3 bg-linear-to-r from-purple-600 to-blue-600 rounded-full text-lg font-semibold hover:scale-105 hover:shadow-purple-500/40 transition-all duration-300 shadow-lg shadow-purple-700/40 animate-fadeSlideUp [animation-delay:0.6s] opacity-0"
        >
          Get Tickets
        </button>

        <div className="mt-10 text-gray-400 text-sm">
          June 18–20, 2026 • Blantyre, Malawi
        </div>
      </div>
    </section>
  )
}