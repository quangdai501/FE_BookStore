import React, { useEffect } from 'react';

export default function useKeyPress(ref, handler) {
    const onEnter = (e) => {
        if (e.keyCode === 13)
            handler(ref.current.value);
    }
    useEffect(() => {
        if (ref.current)
            ref.current.addEventListener('keyup', onEnter)
        return () => {
            ref.current.removeEventListener('keyup', onEnter)
        }
    }, [ref.current])
} 
