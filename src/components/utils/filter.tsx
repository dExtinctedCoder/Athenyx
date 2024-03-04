import { DrawerClose, DrawerTitle, DrawerHeader, DrawerFooter } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { CategoryType } from '@/utils/types'
import RangeSlider from "./rangeSlider"

interface FilterProps {
  currentSettings: {
    sizes: string[]
    currentCategory: "all" | "women" | "men" | "unisex" | "shoes" | "accessories" | "bag" | "watches"
    colors: string[]
    categories: CategoryType
    minPrice: number
    maxPrice: number
    setMinPrice: React.Dispatch<React.SetStateAction<number>>
    setMaxPrice: React.Dispatch<React.SetStateAction<number>>
    setSizes: React.Dispatch<React.SetStateAction<string[]>>
    setColors: React.Dispatch<React.SetStateAction<string[]>>
    setCurrentCategory: React.Dispatch<React.SetStateAction<"all" | "women" | "men" | "unisex" | "shoes" | "accessories" | "bag" | "watches">>
  }
}

function Filter({ currentSettings }: FilterProps) {
  const [localCategory, setLocalCategory] = useState(currentSettings.currentCategory)
  const [localSizes, setLocalSizes] = useState(currentSettings.sizes)
  const [localColors, setLocalColors] = useState(currentSettings.colors)
  const controlSizes = ["s", "m", "l", "xl"]
  const controlColors = ["#020202", "#F7F7F7", "#B82222", "#BEA9A9", "#151867"]

  const updateSize = (value: string) => {
    const copyArr = [...localSizes]
    const valueIndex = localSizes.sort().indexOf(value)
    if (valueIndex === -1) {
      copyArr.push(value)
      copyArr.sort()
    } else {
      copyArr.splice(valueIndex, 1)
    }
    setLocalSizes(copyArr)
  }

  const updateColor = (value: string) => {
    const copyArr = [...localColors]
    const valueIndex = localColors.sort().indexOf(value)
    if (valueIndex === -1) {
      copyArr.push(value)
      copyArr.sort()
    } else {
      copyArr.splice(valueIndex, 1)
    }
    setLocalColors(copyArr)
  }

  const handleFilter = () => {
    // currentSettings.setColors(localColors) TODO: filter based on color
    currentSettings.setSizes(localSizes)
    currentSettings.setCurrentCategory(localCategory)
  }
  return (
    <ScrollArea>
      <DrawerHeader className="p-2 mb-2 shadow-md">
        <div className="flex items-center px-4">
          <DrawerClose>
            <IoIosArrowBack className="w-6 h-6" />
          </DrawerClose>
          <h4 className="font-semibold text-xl mx-auto">Filters</h4>
        </div>
      </DrawerHeader>
      <DrawerTitle className="px-4 py-2 font-medium text-gray-900">
        Price Range
      </DrawerTitle>
      <div className="bg-white shadow-lg px-4 py-4">
        <RangeSlider key={`range--slider`} min={currentSettings.minPrice} max={currentSettings.maxPrice} setMax={currentSettings.setMaxPrice} setMin={currentSettings.setMinPrice} />
      </div>
      <DrawerTitle className="px-4 py-2 font-medium text-gray-900">
        Colors
      </DrawerTitle>
      <div className="bg-white shadow-lg px-4 py-4 flex gap-4 flex-wrap">
        {
          controlColors?.map(color => {
            return <button
              key={color}
              onClick={() => updateColor(color)}
              className={`block border p-1 rounded-full ${localColors.indexOf(color) !== -1 ? `border-[#DB3022]` : `border-transparent hover:border-gray-200`}`}>
              <span style={{ backgroundColor: color }} className={`block w-6 aspect-square rounded-full`}></span>
            </button>
          })
        }
      </div>
      <DrawerTitle className="px-4 py-2 font-medium text-gray-900">
        Sizes
      </DrawerTitle>
      <div className="bg-white shadow-lg px-4 py-4 flex gap-4 flex-wrap">
        {
          controlSizes.map(size => {
            return <Button
              key={size}
              onClick={() => updateSize(size)}
              className={`w-4 text-sm aspect-square border rounded-md ${localSizes.indexOf(size) !== -1 ? `bg-[#DB3022] hover:bg-red-700 text-white` : ` bg-transparent text-gray-800 border-gray-300 hover:bg-gray-300`}`}>{size}</Button>
          })
        }
      </div>
      <DrawerTitle className="px-4 py-2 font-medium text-gray-900">
        Category
      </DrawerTitle>
      <div className="bg-white shadow-lg px-4 py-4 grid grid-cols-3 gap-x-8 gap-y-4">
        <Button onClick={() => setLocalCategory('all')} className={`capitalize px-4 py-2 border font-semibold ${localCategory.toLowerCase() === 'all' ? `bg-[#DB3022] hover:bg-red-700 text-white` : `bg-transparent text-gray-800 border-gray-300 hover:bg-gray-300`}`}>All</Button>
        {
          currentSettings.categories?.map(category => {
            return <Button
              key={category.id}
              onClick={() => setLocalCategory(category.name)}
              className={`capitalize px-4 py-2 border font-semibold ${localCategory.toLowerCase() === category.name.toLowerCase() ? `bg-[#DB3022] hover:bg-red-700 text-white` : `bg-transparent text-gray-800 border-gray-300 hover:bg-gray-300`}`}>{category.name}</Button>
          })
        }
      </div>
      <DrawerFooter className="pb-0 px-0">
        <div className="grid grid-cols-2 gap-x-4 px-4 items-center justify-center pt-6 pb-10 shadow-2xl">
          <DrawerClose>
            <div className="w-full shadow-md py-2 rounded-3xl px-8 font-medium bg-transparent border border-black hover:bg-gray-300">Discard</div>
          </DrawerClose>
          <DrawerClose>
            <div onClick={handleFilter} className="w-full shadow-lg py-2 rounded-3xl px-8 font-medium text-white bg-[#DB3022] hover:bg-red-800">Apply</div>
          </DrawerClose>
        </div>
      </DrawerFooter>
    </ScrollArea>
  )
}
export default Filter