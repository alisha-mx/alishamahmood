import PortfolioHero from '../components/portfolio/PortfolioHero.jsx'
import MoreWork from '../components/portfolio/MoreWork.jsx'
import PortfolioCapabilities from '../components/portfolio/PortfolioCapabilities.jsx'

export default function Portfolio() {
  return (
    <>
      <PortfolioHero />
      <MoreWork />
      <div className="bg-white py-8">
        <div className="container-page">
          <div className="h-px bg-outline-variant/50" />
        </div>
      </div>
      <PortfolioCapabilities />
    </>
  )
}
