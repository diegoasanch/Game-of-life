import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

const press = (keyCode: number, key: string) =>
    fireEvent.keyDown(document, { key, keyCode, which: keyCode })

describe('App', () => {
    it('toggles play/pause with P and Space', () => {
        render(<App />)
        expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument()

        press(32, ' ')
        expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument()

        press(80, 'p')
        expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument()
    })
})
