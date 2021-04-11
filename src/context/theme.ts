import { createContext } from 'react'
import { dark } from '../styles/colors'
import { IthemeContext } from '../types/theme'
import { Itheme } from '../types/styles'

export const default_theme_context = {
    isDark: true,
    toggleTheme: () => console.warn('No toggle theme function defined.'),
}

export const CurrentTheme = createContext<Itheme>(dark)

export const ThemeContext = createContext<IthemeContext>(default_theme_context)
