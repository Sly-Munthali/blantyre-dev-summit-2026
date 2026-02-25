import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function Contact() {
  const location = useLocation()
  const [intent, setIntent] = useState("general")
  const [submitted, setSubmitted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const intentParam = params.get("intent")
    if (intentParam) {
      setIntent(intentParam)
    }
  }, [location])

  const switchMode = (mode) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setIntent(mode)
      setSubmitted(false)
      setIsTransitioning(false)
    }, 200)
  }

  return (
    <section className="relative min-h-screen bg-black text-white py-24 px-6 overflow-hidden">

      {/* Ambient Glow */}
      <div className="absolute w-96 h-96 bg-purple-600/20 blur-[150px] rounded-full -top-20 -left-20 animate-pulse" />
      <div className="absolute w-96 h-96 bg-blue-500/20 blur-[150px] rounded-full bottom-0 right-0 animate-pulse" />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

        {/* LEFT PANEL */}
        <div className={`transition-all duration-300 ${isTransitioning ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"}`}>

          {intent === "tickets" && (
            <button
              onClick={() => switchMode("general")}
              className="text-sm text-gray-400 hover:text-purple-400 mb-6 transition"
            >
              ← Back to General Contact
            </button>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {intent === "tickets" ? "Secure Your Ticket" : "Get In Touch"}
          </h1>

          <p className="text-gray-400 mb-10">
            {intent === "tickets"
              ? "Reserve your place at Blantyre Dev Summit 2026. This animated acquisition flow demonstrates interaction design and UI polish."
              : "Interested in collaboration, speaking, or partnership? Let’s connect."}
          </p>

          {intent === "tickets" ? (
            <TicketInfoPanel />
          ) : (
            <div className="mt-8 p-6 rounded-xl border border-purple-500/30 bg-purple-500/5 hover:border-purple-400 transition">
              <p className="text-sm text-gray-400 mb-3">
                Planning to attend the summit?
              </p>
              <button
                onClick={() => switchMode("tickets")}
                className="px-5 py-2 bg-linear-to-r from-purple-500 to-blue-500 rounded-lg font-semibold hover:scale-105 transition"
              >
                View Ticket Options
              </button>
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className={`bg-white/5 backdrop-blur-lg p-10 rounded-2xl border border-white/10 shadow-xl transition-all duration-300 ${isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>

          {intent === "tickets" ? (
            <TicketForm submitted={submitted} setSubmitted={setSubmitted} />
          ) : (
            <GeneralForm submitted={submitted} setSubmitted={setSubmitted} />
          )}

        </div>

      </div>
    </section>
  )
}

/* ---------------- Ticket Info ---------------- */

function TicketInfoPanel() {
  return (
    <div className="space-y-6 text-sm text-gray-400">
      <div>
        <p className="text-white font-medium">Event Dates</p>
        <p>June 18–20, 2026</p>
      </div>
      <div>
        <p className="text-white font-medium">Location</p>
        <p>Hybrid Experience — Blantyre, Malawi + Virtual Access</p>
      </div>
      <div>
        <p className="text-white font-medium">All Tickets Include</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Full 3-day summit access</li>
          <li>Symposium & debate sessions</li>
          <li>Workshop materials</li>
          <li>Digital networking lounge</li>
        </ul>
      </div>
    </div>
  )
}

/* ---------------- Ticket Form ---------------- */

function TicketForm({ submitted, setSubmitted }) {
  const [selectedTier, setSelectedTier] = useState("pro")
  const [quantity, setQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [processing, setProcessing] = useState(false)

  const tiers = {
    standard: { name: "Standard Pass", price: 99, perks: ["3-Day Access","All Symposium Sessions","Networking Lounge"] },
    pro: { name: "Pro Pass", price: 199, perks: ["Everything in Standard","Workshop Access","Speaker Meet & Greet"] },
    vip: { name: "VIP Experience", price: 349, perks: ["Everything in Pro","Front Row Seating","Private VIP Reception"] }
  }

  const total = tiers[selectedTier].price * quantity

  const handleSubmit = (e) => {
    e.preventDefault()
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
    }, 1200)
  }

  if (submitted) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">🎟</div>
        <p className="text-2xl font-semibold text-purple-400">
          Reservation Confirmed
        </p>
        <p className="text-gray-400 mt-2">
          Simulated checkout complete.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      <div className="space-y-4">
        <p className="text-sm text-gray-400">Select Ticket Type</p>

        {Object.entries(tiers).map(([key, tier]) => (
          <button
            key={key}
            type="button"
            onClick={() => setSelectedTier(key)}
            className={`relative overflow-hidden w-full p-5 rounded-xl border transition-all duration-300 text-left ${
              selectedTier === key
                ? "border-purple-500 bg-white/5 scale-[1.02]"
                : "border-white/10 hover:border-purple-400"
            }`}
          >
            <div className="relative z-10">
              <div className="flex justify-between mb-3">
                <span className="font-semibold">{tier.name}</span>
                <span className="text-lg text-purple-400 font-bold">${tier.price}</span>
              </div>

              <ul className="text-sm text-gray-400 space-y-1">
                {tier.perks.map((perk, i) => (
                  <li key={i}>• {perk}</li>
                ))}
              </ul>

              {key === "pro" && (
                <div className="mt-3 text-xs text-blue-400 font-semibold">
                  MOST POPULAR
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
        <div className="flex justify-between text-xl font-bold text-purple-400">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={processing}
        className="w-full py-3 bg-linear-to-r from-purple-500 to-blue-500 rounded-lg font-semibold hover:scale-[1.02] transition disabled:opacity-50">
        {processing ? "Processing..." : "Complete Reservation"}
      </button>

    </form>
  )
}

/* ---------------- General Form ---------------- */

function GeneralForm({ submitted, setSubmitted }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  if (submitted) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl font-semibold mb-4 text-purple-400">
          Message Sent
        </p>
        <p className="text-gray-400">We’ll respond shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <input type="text" placeholder="Full Name" required
        className="w-full bg-transparent border-b border-white/20 py-2 focus:border-purple-500 focus:outline-none transition" />
      <input type="email" placeholder="Email Address" required
        className="w-full bg-transparent border-b border-white/20 py-2 focus:border-purple-500 focus:outline-none transition" />
      <textarea rows="4" placeholder="Message"
        className="w-full bg-transparent border-b border-white/20 py-2 focus:border-purple-500 focus:outline-none resize-none transition" />
      <button type="submit"
        className="w-full py-3 bg-linear-to-r from-purple-500 to-blue-500 rounded-lg font-semibold hover:scale-[1.02] transition">
        Send Message
      </button>
    </form>
  )
}