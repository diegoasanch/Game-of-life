export type numInputCallback = (
    valueAsNumber: number,
    valueAsString: string,
    inputElement: HTMLInputElement | null
) => void;

export type SetNumValue = (new_value: number) => void;
