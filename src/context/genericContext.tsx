import { Context, createContext, ReactNode, useContext } from 'react'

export const buildGenericContext = <T,>(
	getData: () => T
): [({ children }: { children: ReactNode }) => JSX.Element, () => T, Context<T>] => {
	const HookContext = createContext<T>({} as T)
	const provider = ({ children }: { children: ReactNode }) => {
		const comonData = getData()

		return <HookContext.Provider value={comonData}>{children}</HookContext.Provider>
	}

	const useProviderContext = () => useContext(HookContext)

	return [provider, useProviderContext, HookContext]
}
