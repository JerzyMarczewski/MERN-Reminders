import { useState, useEffect } from "react";

const useMountTransition = (isMounted, unmountDelay) => {
    const [hasTransitionedIn, setHasTransitionedIn] = useState(false);

    useEffect(() => {
        let timoutId;

        if (isMounted && !hasTransitionedIn) {
            setHasTransitionedIn(true)
        } else if (!isMounted && hasTransitionedIn) {
            timoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay)
        }

        return () => clearTimeout(timoutId);
    }, [unmountDelay, isMounted, hasTransitionedIn]);

    return hasTransitionedIn;
}

export default useMountTransition;