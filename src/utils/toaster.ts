import { Position, Toaster, Intent } from '@blueprintjs/core'

export const AppToaster = Toaster.create({
    className: "recipe-toaster",
    position: Position.TOP
})

export const showToast = (message: string, intent?: Intent) => {
    AppToaster.show({ message, intent })
}
