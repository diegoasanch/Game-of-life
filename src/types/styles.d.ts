export type Itheme = {
    readonly background: string,
    readonly text: string,
    readonly sidebar: string,
    readonly cellBorder: string,
    readonly cellAlive: string,
    readonly cellDead: string,
    readonly header: string,
    readonly scrollBarBg: string,
    readonly scrollBarThumb: string,
}

export type IthemeProp = {
    readonly theme: Itheme,
}
export type ICellType = {
    readonly highlightNew: boolean,
}
