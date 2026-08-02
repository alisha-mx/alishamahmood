import AboutHero from '../components/about/AboutHero.jsx'
import StorySection from '../components/about/StorySection.jsx'
import CareerTimeline from '../components/about/CareerTimeline.jsx'
import InspiredBy from '../components/about/InspiredBy.jsx'
import GlobeSection from '../components/GlobeSection.jsx'
import Toolbox from '../components/about/Toolbox.jsx'
import LovedProjects from '../components/about/LovedProjects.jsx'
import ClosingNote from '../components/about/ClosingNote.jsx'

export default function About() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <CareerTimeline />
      <InspiredBy />
      <GlobeSection />
      <Toolbox />
      <LovedProjects />
      <ClosingNote />
    </>
  )
}
