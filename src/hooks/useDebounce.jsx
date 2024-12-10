import { useEffect, useState } from "react";

const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => {
            // console.log("setting new time");
            setDebouncedValue(value);
        }, delay);

        return () => {
            // console.log("clear time");
            clearTimeout(id);
        };
    }, [value, delay]);

    return debouncedValue
};

export default useDebounce
