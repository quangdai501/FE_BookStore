import { useEffect } from 'react';
export default function useClickOutside(ref, handler) {
    const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            handler();
        };
    }
    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        }
    }, [ref, handler])
}