import React from 'react'
import { Slider } from "@blueprintjs/core";
import { SetNumValue } from '../../types/inputs'

interface Iprops {
    value: number,
    setValue: SetNumValue,
}


const SpeedInput = ({ value, setValue }: Iprops) => {
    return (
        <Slider
            value={value}
            onChange={setValue}
            max={30}
            labelStepSize={4}
            min={1}
        />
    )
}

export default SpeedInput
