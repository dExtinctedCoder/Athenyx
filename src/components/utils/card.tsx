import { ProductType } from '@/utils/types'
import { Link } from 'react-router-dom'
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { currencyFormmatter } from '@/utils/constants'
import IMAGE from '@/assets/image (10).png'
import { useState } from 'react'

interface ProductCardProps {
  product: ProductType
  rating?: number // TODO: fetch ratings from backend
  display: 'list' | 'grid'
}

function randomRating() {
  // const max = 5, min = 1
  // const randomDigit = Math.floor(Math.random() * (max - min)) + min
  return 3
}
export function ProductCard({ product, display, rating = randomRating() }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  function displayRatings(value: number) {
    const ratingArray: React.ReactNode[] = []
    for (let i = 0; i < 5; i++) {
      if (i < value) {
        ratingArray.push(<FaStar className="text-orange-500" />)
      } else {
        ratingArray.push(<FaRegStar className="text-gray-400" />)
      }
    }
    return ratingArray
  }
  const handleFavorite = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }
  return (
    <div key={product.id} className={`${display === 'list' ? `basis-full bg-white shadow-lg` : `basis-1/2 bg-gray-200 shadow-md`} relative rounded-2xl capitalize text-lg font-medium`}>
      {
        display === 'list' ?
          <>
            <Link to={`/product/${product.id}`} className="flex items-stretch">
              <div className="basis-1/3 rounded-l-2xl overflow-hidden h-fulls bg-gray-200 flex items-center justify-center">
                <img src={IMAGE} alt={`IMG-${product.name}`} className="w-full h-full" />
                {/* TODO: fetch product image from backend */}
                {/* <img src={product.images} alt={`IMG-${product.name}`} /> */}
              </div>
              <div className="basis-2/3 px-4 py-4 gap-y-2 flex flex-col">
                <h4 className="font-bold text-[20px]">{product.name}</h4>
                <p className="text-gray-200">{/* TODO: add brand */}</p>
                <div className="flex items-center gap-x-[1px]">
                  {
                    displayRatings(rating!).map((ratings, index) => {
                      return <div key={index}>{ratings}</div>
                    })
                  }
                  <span className="text-gray-400 text-sm">({rating === 0 ? 0 : randomRating()/* add number of reviews from backend */})</span>
                </div>
                <h6 className="font-semibold text-lg">{currencyFormmatter.format(Number(product.price.toFixed(2)))}</h6>
              </div>
            </Link>
            <div onClick={(e) => handleFavorite(e)} className="absolute bottom-0 right-0 rounded-full flex items-center justify-center bg-white p-2 shadow-2xl cursor-pointer translate-y-1/3">
              {
                isFavorite ? /* TODO: add favorite from backend */
                  <MdOutlineFavorite fontSize="22px" className="text-[#DB3022]" /> :
                  <MdOutlineFavoriteBorder fontSize="22px" className="text-gray-400" />
              }
            </div>
          </> :
          <>
            <Link to={`/product/${product.id}`} className="relative flex flex-col">
              <div className="relative w-full h-[250px] bg-gray-200 rounded-t-2xl flex items-center justify-center">
                <img src={IMAGE} alt={`IMG-${product.name}`} className="w-full h-full rounded-t-2xl" />
                <div onClick={(e) => handleFavorite(e)} className="absolute bottom-0 right-0 rounded-full flex items-center justify-center bg-white p-2 shadow-2xl cursor-pointer translate-y-1/3">
                  {
                    isFavorite ? /* TODO: add favorite from backend */
                      <MdOutlineFavorite fontSize="22px" className="text-[#DB3022]" /> :
                      <MdOutlineFavoriteBorder fontSize="22px" className="text-gray-400" />
                  }
                </div>
              </div>
              <div className="px-2 py-2 gap-y-2 flex flex-col justify-between">
                <div className="flex items-center gap-x-[1px]">
                  {
                    displayRatings(rating!).map((ratings, index) => {
                      return <div key={index} className="text-sm">{ratings}</div>
                    })
                  }
                  <span className="text-gray-400 text-sm">({rating === 0 ? 0 : randomRating()/* add number of reviews from backend */})</span>
                </div>
                <p className="text-gray-200">{/* TODO: add brand */}</p>
                <h4 className="font-bold text-base">{product.name}</h4>
                <h6 className="font-semibold text-sm">{currencyFormmatter.format(Number(product.price.toFixed(2)))}</h6>
              </div>
            </Link>
          </>
      }
    </div>
  )
}
