import { IoMdHome } from 'react-icons/io'
import { FaShoppingCart } from 'react-icons/fa'
import { GiShoppingBag } from 'react-icons/gi'
import { MdOutlineFavorite } from 'react-icons/md'
import { FaCircleUser } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

const Homebar = () => {
  return (
    <header className="fixed bottom-0 w-full z-50 px-8 py-5 rounded-2xl rounded-b-none bg-white">
      <TooltipProvider>
        <nav className="flex items-center justify-between gap-x-4">
          <Tooltip>
            <TooltipTrigger>
              <NavLink to="/" className="homebar text-[#9B9B9B] flex items-center flex-col">
                <IoMdHome width="30px" height="30px" className="w-[30px] h-[30px] mb-1" />
                <p className="text-sm">Home</p>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent>home</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <NavLink to="/shop" className="homebar text-[#9B9B9B] flex items-center flex-col">
                <FaShoppingCart width="30px" height="30px" className="w-[30px] h-[30px] mb-1" />
                <p className="text-sm">Shop</p>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent>shop</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <NavLink to="/bag" className="homebar text-[#9B9B9B] flex items-center flex-col">
                <GiShoppingBag width="30px" height="30px" className="w-[30px] h-[30px] mb-1" />
                <p className="text-sm">Bag</p>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent>bag</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <NavLink to="/favorite" className="homebar text-[#9B9B9B] flex items-center flex-col">
                <MdOutlineFavorite width="30px" height="30px" className="w-[30px] h-[30px] mb-1" />
                <p className="text-sm">Favorite</p>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent>favorite</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <NavLink to="/profile" className="homebar text-[#9B9B9B] flex items-center flex-col">
                <FaCircleUser width="30px" height="30px" className="w-[30px] h-[30px] mb-1" />
                <p className="text-sm">Profile</p>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent>profile</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </header>
  )
}

export default Homebar