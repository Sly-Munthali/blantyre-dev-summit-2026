import { useRef, useEffect } from "react"

export default function SpeakerCard({ name, role, image, delay}) {

  const revealRef = useRef(null)
  const tiltRef = useRef(null)

  // Scroll Reveal
  useEffect(() => {
    const card = revealRef.current
    if (!card) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {

          card.style.transitionDelay = `${delay}s`
          card.classList.remove("opacity-0", "translate-y-8")
          observer.unobserve(card)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  // Tilt Effect
  const handleMouseMove = (e) => {
    const card = tiltRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * 8
    const rotateY = ((x - centerX) / centerX) * -8

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    const card = tiltRef.current
    if (!card) return
    card.style.transform = "rotateX(0deg) rotateY(0deg)"
  }

  return (
    <div style={{ perspective: "1200px" }} className="w-72 h-96">

      {/* Reveal Layer */}
      <div ref={revealRef} className="opacity-0 translate-y-8 transition-all duration-700 ease-out" >

        {/* Tilt Layer */}
        <div
          ref={tiltRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative w-72 h-96 rounded-xl p-0.5 bg-linear-to-br from-purple-500 via-blue-500 to-pink-500 transition-transform duration-200 ease-out"
          style={{ transformStyle: "preserve-3d",
  willChange: "transform",
  backfaceVisibility: "hidden" }}
        >

          {/* Glow */}
          <div className="absolute inset-0 rounded-xl blur-xl opacity-30 group-hover:opacity-60 bg-linear-to-br from-purple-500 via-blue-500 to-pink-500 transition duration-500" />

          {/* Card Body */}
          <div className="relative bg-black/90 backdrop-blur-lg rounded-xl h-full flex flex-col overflow-hidden antialiased"
          style={{
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden"
                    }}
                    >

            <img
              src={image}
              alt={name}
              className="h-48 w-full object-cover"
              style={{ transform: "translateZ(40px)" }}
            />

            <div
              className="p-5 flex-1 flex flex-col justify-between"
              style={{ transform: "translateZ(60px)" }}
            >
              <div>
                <h3 className="text-xl font-bold text-white">
                  {name}
                </h3>
                <p className="text-purple-400 text-sm mb-3">
                  {role}
                </p>
                <p className="text-gray-400 text-sm">
                  Innovating the future of African tech ecosystems.
                </p>
              </div>

              <button className="mt-4 text-sm text-blue-400 hover:text-white transition inline-block w-fit self-start">
                View Profile →
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}