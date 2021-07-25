import { useCallback, useState } from "react"
import { useLocalStorage } from "react-use"
import { dark, light } from "../styles/colors"
import { Itheme } from '../types/styles';
import { buildGenericContext } from './genericContext';


const useTheme = () => {
    const [isDark, setIsDark] = useLocalStorage<boolean>('isDark', true)
    const [theme, setTheme] = useState<Itheme>(dark)

    const toggleTheme = useCallback(() => {
        console.log(`Toggle theme`)

        let newTheme: Itheme
        if (!isDark)
            newTheme = dark
        else
            newTheme = light

        setTheme(newTheme)
        setIsDark(!isDark)

    }, [setIsDark, isDark, setTheme])

    return { theme, isDark: !!isDark, toggleTheme }
}

export const [ThemeProvider, useThemeContext] = buildGenericContext(useTheme)
