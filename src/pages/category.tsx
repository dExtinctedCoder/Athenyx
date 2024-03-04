/* eslint-disable @typescript-eslint/no-unused-vars */
import { FetchAllProduct, FetchStoreCategories } from "@/utils/api"
import { CategoryType, ShopType, CategoryInterface } from "@/utils/types"
import { useState, useEffect, useCallback } from "react"
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/drawer'
import { IoIosArrowBack, IoMdSearch } from 'react-icons/io'
import { IoFilter } from 'react-icons/io5'
import { BsFillGrid3X3GapFill } from 'react-icons/bs'
import { LuArrowUpDown } from 'react-icons/lu'
import { FaThList } from 'react-icons/fa'
import SEARCH from '@/assets/icon/search.png'
import { useNavigate } from "react-router-dom"
import Loading from "@/components/utils/loading"
import Homebar from "@/components/utils/homebar"
import { ProductCard } from "@/components/utils/card"
import Filter from '@/components/utils/filter'

const categoryId = {
  'all': 0,
  'women': 1,
  'men': 2,
  'unisex': 3,
  'shoes': 6,
  'accessories': 7,
  'bag': 8,
  'watches': 9
}
const currentSizes = ["s", "m", "l", "xl"]
const currentColors = ["#020202"]

function Category() {
  const navigate = useNavigate()
  const [display, setDisplay] = useState('list' as 'list' | 'grid')
  const [filteredCategory, setFilteredCategory] = useState([] as CategoryType)
  const [showSearchbar, setShowSearchbar] = useState(false)
  const currentFilter = location.search.replace('?=', "")
  const [data, setData] = useState([] as ShopType)
  const [currentCategory, setCurrentCategory] = useState(currentFilter as CategoryInterface)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(300)
  const [sizes, setSizes] = useState(currentSizes)
  const [colors, setColors] = useState(currentColors)
  const { data: categoryData, isLoading: isCategoryPayloadLoading, isError: isCategoryPayloadError } = FetchStoreCategories()
  const { data: products, isLoading: isProductPayloadLoading, isError: isProductPayloadError, refetch: fetch } = FetchAllProduct()

  const filterSize = useCallback(
    (data: ShopType) => {
      let filter: ShopType = []
      if (currentCategory.toLowerCase() !== 'all') {
        const filteredProducts = data?.filter(product => product.category === categoryId[currentCategory])
        filter = filteredProducts!
      } else {
        filter = data!
      }
      const matchedProducts: ShopType = []
      for (const size of sizes) {
        filter?.filter(product => {
          if (product.sizes === size) {
            matchedProducts.push(product)
          }
        })
      }
      setData(matchedProducts)
    },
    [currentCategory, sizes],
  )

  const filterPriceRange = useCallback(
    () => {
      let filter: ShopType = []
      if (currentCategory.toLowerCase() !== 'all') {
        const filteredProducts = products?.filter(product => product.category === categoryId[currentCategory])
        filter = filteredProducts!
      } else {
        filter = products!
      }
      const filteredPrices = filter?.filter(product => {
        return product.price >= minPrice && product.price <= maxPrice
      })
      filterSize(filteredPrices)
    },
    [currentCategory, filterSize, products, minPrice, maxPrice],
  )

  useEffect(() => {
    const filtered = categoryData?.filter(category => category.name.toLowerCase() !== currentCategory.toLowerCase())
    setFilteredCategory(filtered!)
    fetch()
    if (currentCategory.toLowerCase() === 'all') {
      setData(products!)
    }
    else {
      const filtered = products?.filter(product => product.category === categoryId[currentCategory])
      setData(filtered!)
    }
    filterPriceRange()

  }, [categoryData, filterSize, filterPriceRange, fetch, products, currentCategory])

  if (isProductPayloadError || isCategoryPayloadError) {
    return <div>Something went wrong!</div>
  }

  const handleCategoryBtnClick = (location: CategoryInterface) => {
    setCurrentCategory(location)
    navigate(`?=${location}`)
  }

  const filterSettings = {
    colors,
    sizes,
    currentCategory,
    categories: categoryData!,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    setSizes,
    setColors,
    setCurrentCategory,
  }

  return (
    <Drawer>
      <DrawerContent className="bg-gray-200"><Filter currentSettings={filterSettings} /></DrawerContent>
      <div className="pb-24">
        <section className="">
          <header className="z-50 pt-6 pb-2 shadow-md bg-white sticky top-0 w-full">
            <div className="px-4 mb-2 flex items-center justify-between">
              <IoIosArrowBack onClick={() => navigate('/category')} className="w-6 h-6 cursor-pointer" />
              <div onClick={() => setShowSearchbar(!showSearchbar)} className="">
                <IoMdSearch className="w-6 h-6 cursor-pointer" />
              </div>
            </div>
            {
              showSearchbar ?
                <div className="px-4 py-2">
                  <form className="border border-gray-300">
                    <input style={{ backgroundImage: `url(${SEARCH})`, backgroundRepeat: 'no-repeat', backgroundPosition: '16px 50%', backgroundSize: '20px' }} type="search" name="search" id="search" placeholder="Search..." className="py-3 pl-12 pr-4 bg-inherit w-full focus:outline-0" />
                  </form>
                </div> :
                null
            }
            <div>
              <h2 className="px-4 text-5xl font-bold capitalize py-4">{currentCategory}</h2>
              <div className="flex items-center gap-x-4 px-4 py-4 overflow-x-scroll no-scrollbar">
                {
                  isCategoryPayloadLoading ? <div>loading...</div> :
                    <>
                      {
                        currentCategory !== 'all' ?
                          <button onClick={() => handleCategoryBtnClick('all')} className="w-fit text-sm px-6 py-1 bg-black text-white rounded-2xl">All</button>
                          : null
                      }
                      {
                        filteredCategory?.length && filteredCategory.map((category, index) => {
                          return (
                            <button onClick={() => handleCategoryBtnClick(category.name)} key={`${category.id}+${index}`} className="w-fit text-sm px-6 py-1 bg-black text-white rounded-2xl">{category.name}</button>
                          )
                        })
                      }
                    </>
                }
              </div>
              <div className="px-4">
                <div className="flex items-center justify-between bg-gray-200 rounded-sm p-1">
                  <DrawerTrigger>
                    <div className="flex items-center gap-x-2 text-sm hover:bg-gray-300"><IoFilter className="text-lg" />Filters</div>
                  </DrawerTrigger>
                  <button className="flex items-center gap-x-2 text-sm hover:bg-gray-300"><LuArrowUpDown className="text-lg" />Price: lowest to high</button>
                  {
                    display === 'list' ?
                      <BsFillGrid3X3GapFill onClick={() => setDisplay('grid')} className="text-lg cursor-pointer" /> :
                      <FaThList onClick={() => setDisplay('list')} className="text-lg cursor-pointer" />
                  }
                </div>
              </div>
            </div>
          </header>
          <div className="">
            <ul className={`px-4 py-8 ${!data?.length ? `bg-transparent` : (display === 'list' ? `bg-gray-200 flex flex-col gap-y-8` : `bg-gray-100 grid grid-cols-2 gap-4`)}`}>
              {
                (isProductPayloadLoading) ? <Loading /> :
                  (
                    data?.length ?
                      (data.map((product) => {
                        return (
                          <ProductCard key={product.id} product={product} display={display} />
                        )
                      })) : <div className="w-full"><h2 className="text-3xl font-semibold">No Product match this category</h2></div>
                  )
              }
            </ul>
          </div>
        </section>
        <Homebar />
      </div>
    </Drawer>
  )
}

export default Category