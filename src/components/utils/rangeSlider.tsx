import { currencyFormmatter } from '@/utils/constants'

interface RangeProps {
  min: number
  max: number
  setMin: React.Dispatch<React.SetStateAction<number>>
  setMax: React.Dispatch<React.SetStateAction<number>>
}
function RangeSlider({ min, max, setMax, setMin }: RangeProps) {
  const handleMaxChange = (e: number) => {
    if (e <= min) {
      setMax(min)
    } else setMax(e)
  }
  const handleMinChange = (e: number) => {
    if (e >= max) {
      setMin(max)
    } else setMin(e)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p>{currencyFormmatter.format(Number(min))}</p>
        <p>{currencyFormmatter.format(Number(max))}</p>
      </div>
      <div className="flex flex-col gap-y-8 items-center justify-between relative">
        <input
          type="range"
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="block w-full accent-red-700 h-[2px]"
          value={min} min={0} max={250}
        />
        <input
          type="range"
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="block w-full accent-red-700 h-[2px]"
          value={max} min={0} max={250}
        />
        {/* <div className="absolute top-0 left-0 right-0 -translate-y-1/2 h-[2px] bg-gray-300"> */}
        {/* <span className={`absolute top-0 bottom-0 left-[${minVal}%] right-[${maxVal / 2}%] block h-full bg-[#DB3022]`}></span> */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default RangeSlider