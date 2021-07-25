export type Itheme = {
    background: string
    text: string
    sidebar: string
    cellBorder: string
    cellAlive: string
    cellDead: string
    header: string
    scrollBarBg: string
    scrollBarThumb: string
}

export type ThemeDetails = {
    isDark: boolean
    toggleTheme: () => void
}

export type IthemeProp = {
    readonly theme: Itheme,
}

export type ICellType = {
    readonly highlightNew: boolean,
}
