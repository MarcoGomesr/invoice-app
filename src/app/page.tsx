import Hero from "./components/Hero"
import Navbar from "./components/Navbar"

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
    </main>
  )
}
