import Homebar from '../components/utils/homebar'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoIosArrowBack, IoMdSearch } from 'react-icons/io'
import { FetchStoreCategories } from '@/utils/api'
import SEARCH from '@/assets/icon/search.png'
import { useState } from 'react'
import Category from '../pages/category'

const Shop = () => {
  const [showSearchbar, setShowSearchbar] = useState(false)
  const { data, isLoading } = FetchStoreCategories()
  const navigate = useNavigate()

  const location = useLocation()
  const currentFilter = location.search.replace('?=', "")

  if (isLoading) {
    return <h1 className="text-5xl text-gray-600 text-center">Loading...</h1>
  }

  if (!currentFilter.length) {
    return (
      <div className="pb-24">
        <section className="">
          <header className="py-6 shadow-md">
            <div className="flex items-center justify-between px-4">
              <IoIosArrowBack onClick={() => navigate(-1)} className="w-6 h-6" />
              <h4 className="font-semibold text-xl">Categories</h4>
              <div>
                <IoMdSearch onClick={() => setShowSearchbar(!showSearchbar)} className="w-6 h-6" />
              </div>
            </div>
            {
              showSearchbar ?
                <div className="px-4 py-2">
                  <form className="border border-gray-300">
                    <input style={{ backgroundImage: `url(${SEARCH})`, backgroundRepeat: 'no-repeat', backgroundPosition: '16px 50%', backgroundSize: '20px' }} type="search" name="search" id="search" placeholder="Search..." className="py-3 pl-12 pr-4 bg-inherit w-full focus:outline-0" />
                  </form>
                </div> :
                ""
            }
          </header>
          <p className="text-[#9B9B9B] text-sm pt-4 pb-10 px-4">Choose category</p>
          <ul className="flex flex-col">
            {
              data && data.map((category: { id: number, name: string }) => {
                return <Link key={category.id} to={`?=${category.name}`} className="py-4 border-b-2 capitalize border-gray-200 px-4 text-lg font-medium">{category.name}</Link>
              })
            }
          </ul>
        </section>
        <Homebar />
      </div>
    )
  }
  return <Category />

}

export default Shop