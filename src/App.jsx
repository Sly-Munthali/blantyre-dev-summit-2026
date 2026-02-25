import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Speakers from "./pages/Speakers"
import Schedule from "./pages/Schedule"
import Contact from "./pages/Contact"
import Footer from "./components/Footer"

function App() {
  const location = useLocation()

  return (
    <>
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/speakers"
            element={
              <PageWrapper>
                <Speakers />
              </PageWrapper>
            }
          />
          <Route
            path="/schedule"
            element={
              <PageWrapper>
                <Schedule />
              </PageWrapper>
            }
          />
          <Route
            path="/contact"
            element={
              <PageWrapper>
                <Contact />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  )
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

export default App