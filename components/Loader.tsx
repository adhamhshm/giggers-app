"use client";

import { useState} from "react";
import { ThreeDots  } from "react-loader-spinner";

const Loader = () => {

    const [ isVisible, setIsVisible ] = useState<boolean>(true);

    setTimeout(() => {
        setIsVisible(false);
    }, 3000);

    return (
        <div className="flex justify-center items-center w-full z-10">
            {isVisible ? (
                <ThreeDots color="gray" />
            ) : (
                <></>
            )}
        </div>
    )
}

export default Loader;