import { Context, createContext, useContext } from 'react'

export const buildGenericContext = <T extends unknown>(
	getData: () => T
): [({ children }: any) => JSX.Element, () => T, Context<T>] => {
	const HookContext = createContext<T>({} as T)
	const provider = ({ children }: any) => {
		const comonData = getData()

		return <HookContext.Provider value={comonData}>{children}</HookContext.Provider>
	}

	const useProviderContext = () => useContext(HookContext)

	return [provider, useProviderContext, HookContext]
}
