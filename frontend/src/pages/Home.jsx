import React from 'react'
import Navbar from '../components/layout/Navbar'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import Pricing from '../components/landing/Pricing'
import Footer from '../components/layout/Footer'

const Home = () => {
  return (
    <div>
        <Navbar />
        <main className="">
        <Hero />
        <div className="">
          <Features />
        </div>
        < Pricing />
        </main>
        <Footer />
    </div>
  )
}

export default Home