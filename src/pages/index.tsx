import { Link } from 'react-router-dom'
import Homebar from '../components/utils/homebar'
import Banner1 from '../assets/yellow-hoodie.png'
import Banner2 from '../assets/woman-in-dark-glasses.png'
import Banner3 from '../assets/main.png'

const LandingPage = () => {
  return (
    <div className="pb-24">
      <section className="grid grid-cols-1 grid-rows-[500px_500px]">
        <Link to="" className="w-full block relative">
          <img className="w-full h-[500px] object-top object-cover" src={Banner3} alt="" />
          <h2 className="absolute font-semibold bottom-8 right-8 text-4xl text-white">New collection</h2>
        </Link>
        <div className="flex h-[500px]">
          <div className="basis-full flex flex-col">
            <Link to="" className="basis-full h-[250px] flex flex-col items-center justify-center">
              <h3 className="text-4xl font-semibold text-[#DB3022]">Summer <br /> sale</h3>
            </Link>
            <Link to="" className="basis-1/2 block relative">
              <img className="w-full h-[250px] object-center object-cover" src={Banner2} alt="" />
              <h3 className="text-4xl text-white font-semibold absolute bottom-8 left-8">Black</h3>
            </Link>
          </div>
          <Link to="" className="basis-full block relative">
            <img className="w-full h-[500px] object-center object-cover" src={Banner1} alt="" />
            <h3 className="text-4xl text-white font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto">Men&apos;s <br /> hoodies</h3>
          </Link>
        </div>
      </section>
      <Homebar />
    </div>
  )
}
export default LandingPage