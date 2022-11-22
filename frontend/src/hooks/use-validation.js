import { useState } from "react";

const useValidation = (inputFunction) => {
    const [enteredInput, setEnteredInput] = useState('');
    const [inputTouched, setInputTouched] = useState(false);

    const isValid = inputFunction(enteredInput);

    const hasError = !isValid && inputTouched

    const inputChangeHandler = (event) => {
        setEnteredInput(event.target.value);
    }

    const inputBlurHandler = (event) => {
        setInputTouched(true);
    }

    const reset = () => {
        setEnteredInput('');
        setInputTouched(false);
    }

    return {
        value: enteredInput,
        isValid,
        hasError,
        onChange: inputChangeHandler,
        onBlur: inputBlurHandler,
        reset
    }
}

export default useValidation;