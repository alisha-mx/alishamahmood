import AboutHero from '../components/about/AboutHero.jsx'
import StorySection from '../components/about/StorySection.jsx'
import CareerTimeline from '../components/about/CareerTimeline.jsx'
import WhatIDo from '../components/WhatIDo.jsx'
import GlobeSection from '../components/GlobeSection.jsx'
import Toolbox from '../components/about/Toolbox.jsx'

export default function About() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <CareerTimeline />
      <WhatIDo />
      <GlobeSection />
      <div className="bg-white">
        <div className="container-page">
          <div className="h-px bg-outline-variant/50" />
        </div>
      </div>
      <Toolbox />
    </>
  )
}
