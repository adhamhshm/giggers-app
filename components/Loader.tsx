"use client";

import { useRef, useState} from "react";
import { ThreeDots  } from "react-loader-spinner";

// type Props = {
//     isVisible: boolean,
// }

const Loader = () => {

    const [ isVisible, setIsVisible ] = useState<boolean>(true);
    const overlay = useRef<HTMLDivElement>(null);

    setTimeout(() => {
        setIsVisible(false);
    }, 3000);

    return (
        <div>
            {isVisible ? (
                <div ref={overlay} className="modal_loader">
                    <ThreeDots color="gray" />
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default Loader;