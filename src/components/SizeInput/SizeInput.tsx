import React from 'react'
import {  NumericInput } from "@blueprintjs/core";
import { numInputCallback } from '../../types/inputs'

interface Iprops {
    value: number,
    maxValue: number | undefined,
    placeholder: string,
    handleInput: numInputCallback,
}

const SizeInput = ({ value, maxValue, placeholder, handleInput }: Iprops) => {

    return (
        <NumericInput
            allowNumericCharactersOnly={false}
            min={0}
            max={maxValue}
            onValueChange={handleInput}
            placeholder={placeholder}
            value={value}
            fill
        />
    )
}

export default SizeInput
