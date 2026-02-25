import SpeakerCard from "./SpeakerCard"
import ManImg from "../assets/Speakers/Man.jpg"
import Woman1Img from "../assets/Speakers/Woman1.jpg"
import Woman2mg from "../assets/Speakers/Woman2.jpg"

export default function Speakers() {
  const speakers = [
    {
      name: "Thoko Banda",
      role: "Senior Frontend Engineer",
      image: Woman1Img
    },
    {
      name: "James Mvula",
      role: "AI Research Lead",
      image: ManImg
    },
    {
      name: "Chikondi Phiri",
      role: "Cloud Architect",
      image: Woman2mg
    },
  ]

  return (
    <section className="min-h-screen bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Featured Speakers
        </h2>

        <div className="flex flex-wrap justify-center gap-10">
          {speakers.map((speaker, index) => (
            <SpeakerCard key={index} {...speaker} delay={index * 0.15} />
          ))}
        </div>

      </div>
    </section>
  )
}