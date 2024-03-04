import RoutesIndex from './routes'
import { Suspense } from 'react'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './utils/constants'
import { AppGlobalContext } from './components/context/global'

function Loader() {
  return (<div>Loading...</div>)
}

function App() {
  return (
    <>
      <div className="app no-scrollbar bg-[#F9F9F9] min-h-[100dvh] text-[#222]">
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={Loader()}>
            <AppGlobalContext>
              <RoutesIndex />
            </AppGlobalContext>
          </Suspense>
        </QueryClientProvider>
      </div>
    </>
  )
}

export default App
