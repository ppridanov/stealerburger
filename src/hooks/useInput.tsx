import {useRef} from "react";

export const useCustomInput = () => {
    const ref = useRef<HTMLInputElement>(null);
    const handleBlur = (e: FocusEvent) => {
        e.preventDefault();
        let input = ref.current;
        if (input) {
            input.setAttribute('disabled', 'true');
            input.classList.add('input__textfield-disabled');
        }
    }
    const handleIconClick = (e: MouseEvent) => {
        e.preventDefault();
        let input = ref.current;
        if (input) {
            input.removeAttribute('disabled');
            input.classList.remove('input__textfield-disabled')
            input.focus();
        }
    }
    return {
        ref,
        handleBlur,
        handleIconClick
    }
}