import { createContext } from 'react'

interface globalContextTypes {

}

interface AppGlobalContextTypes {
  children: React.ReactNode
}

export const GlobalContext = createContext({} as globalContextTypes)
export function AppGlobalContext({ children }: AppGlobalContextTypes) {
  const globalObject = {}
  return (
    <GlobalContext.Provider value={globalObject}>
      {children}
    </GlobalContext.Provider>
  )
}
