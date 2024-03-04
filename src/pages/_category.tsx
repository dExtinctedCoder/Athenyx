import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FetchAllProduct, FetchCategoryProducts, FetchStoreCategories } from '@/utils/api'
import { CategoryType, ShopType, color, sizes } from '@/utils/types'
import { ProductCard } from '@/components/utils/card'
import Loading from '../components/utils/loading'
import Homebar from '../components/utils/homebar'
import { IoIosArrowBack, IoMdSearch } from 'react-icons/io'
import { IoFilter } from 'react-icons/io5'
import { BsFillGrid3X3GapFill } from 'react-icons/bs'
import { LuArrowUpDown } from 'react-icons/lu'
import { FaThList } from 'react-icons/fa'
import SEARCH from '@/assets/icon/search.png'
import Filter from '@/components/utils/filter'
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/drawer'

function Category() {
  const [filteredCategory, setFilteredCategory] = useState([] as CategoryType)
  const [showSearchbar, setShowSearchbar] = useState(false)
  const [display, setDisplay] = useState('list' as 'list' | 'grid')
  const navigate = useNavigate()
  const location = useLocation()
  const currentFilter = location.search.replace('?=', "")
  const [currentCategory, setCurrentCategory] = useState(currentFilter)
  const [data, setData] = useState([] as ShopType)
  const [filteredList, setFilteredList] = useState([] as ShopType)

  const onAllProductSuccess = (data: ShopType) => {
    setData(data)
    // if (!isFilter) setData(data)
    // else setFilterData(data)
  }
  const onFilteredProductSuccess = (data: ShopType) => {
    setData(data)
    // if (!isFilter) setData(data)
  }

  const { data: productData, isLoading: isProductPayloadLoading, isError: isProductPayloadError, refetch } = FetchCategoryProducts(currentCategory, onFilteredProductSuccess)
  const { data: categoryData, isLoading: isCategoryPayloadLoading, isError: isCategoryPayloadError } = FetchStoreCategories()
  const { data: allProducts, isLoading: isAllProductPayloadLoading, refetch: fetchAllProducts } = FetchAllProduct(onAllProductSuccess)

  useEffect(() => {
    const filtered = categoryData?.filter(category => category.name.toLowerCase() !== currentCategory.toLowerCase())
    setFilteredCategory(filtered!)
    if (currentCategory === 'all') {
      fetchAllProducts()
    } else refetch()

  }, [categoryData, currentCategory, refetch, fetchAllProducts])

  if (isProductPayloadError || isCategoryPayloadError) {
    return <div>Something went wrong!</div>
  }
  const handleCategoryBtnClick = (location: string) => {
    setCurrentCategory(location)
    navigate(`?=${location}`)
  }

  const handleDisplay = (display: 'list' | 'grid') => {
    setDisplay(display)
  }

  const filterSettings = {
    sizes: [
      { value: 'XS', isCurrent: false }, { value: 'S', isCurrent: false }, { value: 'M', isCurrent: false }, { value: 'L', isCurrent: false }, { value: 'XL', isCurrent: false }
    ],
    currentFilter: currentFilter, categories: categoryData!,
    priceRange: [0, 200],
    colors: [
      {
        name: 'black',
        hexcode: '#000',
        isCurrent: false
      },
      {
        name: 'red',
        hexcode: '#B82222',
        isCurrent: false
      },
      {
        name: 'blue',
        hexcode: '#151867',
        isCurrent: false
      },
      {
        name: 'white',
        hexcode: '#F7F7F7',
        isCurrent: false
      },
      {
        name: 'gray',
        hexcode: '#BEA9A9',
        isCurrent: false
      },
      {
        name: 'silk',
        hexcode: '#E2BB8D',
        isCurrent: false
      },
    ],
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filterPriceRange = (min: number, max: number, category: string) => {
    if (filteredList.length === 0) {
      setFilteredList(data)
    }
    const filtered = data?.filter(product => {
      return product.price >= min && product.price <= max
    })
    setFilteredList(filtered!)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function updateFecthData(_priceRange: number[] = [], _colors: color[] = [], _sizes: sizes[] = [], category: string) {
    if (currentFilter !== category) {
      if (category.toLowerCase() === 'all') {
        fetchAllProducts()
        navigate(`?=${category}`)
        setCurrentCategory(category)
        setData(allProducts!)
      } else {
        handleCategoryBtnClick(category)
      }
    }
    if (_priceRange.length) {
      filterPriceRange(_priceRange[0], _priceRange[1], category)
    }
  }
  return (
    <Drawer>
      <DrawerContent className="bg-gray-200"><Filter fetch={updateFecthData} currentSettings={filterSettings} /></DrawerContent>
      <div className="pb-24">
        <section className="">
          <header className="z-50 pt-6 pb-2 shadow-md bg-white sticky top-0 w-full">
            <div className="px-4 mb-2 flex items-center justify-between">
              <IoIosArrowBack onClick={() => navigate(-1)} className="w-6 h-6 cursor-pointer" />
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
                    filteredCategory?.length && filteredCategory.map((category, index) => {
                      return (
                        <button onClick={() => handleCategoryBtnClick(category.name)} key={`${category.id}+${index}`} className="w-fit text-sm px-6 py-1 bg-black text-white rounded-2xl">{category.name}</button>
                      )
                    })
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
                      <BsFillGrid3X3GapFill onClick={() => handleDisplay('grid')} className="text-lg cursor-pointer" /> :
                      <FaThList onClick={() => handleDisplay('list')} className="text-lg cursor-pointer" />
                  }
                </div>
              </div>
            </div>
          </header>
          <div className="">
            <ul className={`px-4 py-8 ${!productData?.length ? `bg-transparent` : (display === 'list' ? `bg-gray-200 flex flex-col gap-y-8` : `bg-gray-100 grid grid-cols-2 gap-4`)}`}>
              {
                (isProductPayloadLoading || isAllProductPayloadLoading) ? <Loading /> :
                  (
                    data?.length ?
                      (filteredList.map((product) => {
                        return (
                          <ProductCard key={product.id} product={product} display={display} />
                        )
                      })) : <div className="w-full"><h2 className="text-3xl font-semibold">No Product in this category yet!</h2></div>
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