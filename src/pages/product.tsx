import { useLocation } from 'react-router-dom'
import { FetchProductDetail } from '@/utils/api'
import { currencyFormmatter } from '@/utils/constants'
import Loading from '../components/utils/loading'
// import Homebar from '../components/utils/homebar'

function Product() {
  const location = useLocation()
  const path = location.pathname.split("/")
  const id = path[path.length - 1]

  const { data, isLoading, isError, error } = FetchProductDetail(id)

  if (isError) {
    return <div>{JSON.stringify(error)}</div>
  }

  return (
    <div className="pb-24">
      <section className="">
        <ul className="flex flex-col">
          {
            isLoading ? <Loading /> :
              <div key={data?.id} className="py-4 border-b-2 capitalize border-gray-200 px-4 text-lg font-medium">
                <h1 className="text-3xl text-gray-600 text-center">{data?.name}</h1>
                <p className="leading-7">{data?.description}</p>
                <div><p>{currencyFormmatter.format(Number(data?.price.toFixed(2)))}</p></div>
              </div>
          }
        </ul>
      </section>
      {/* <Homebar /> */}
    </div>
  )
}

export default Product