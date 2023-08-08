"use client";

import { useCallback, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

//the Modal will accept some children, define the type of the children as ReactNode
const Modal = ({ children } : { children: ReactNode }) => {
    
    //2 different wrap properties
    const overlay = useRef<HTMLDivElement>(null); //the start it will be set to null
    const wrapper = useRef<HTMLDivElement>(null);
    const router = useRouter();

    //to close the overlay Modal
    //useCallback -> will return a memoized version of the callback that only changes if one of the inputs has changed
    const handleDismiss = useCallback(() => {
        router.push("/");
    }, [router]);

    //to ensure when user click outside of the wrapper Modal, the overlay will be also closed
    //meaning does the same as what the handleDismiss does
    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        //if user click the overlay, and the handleDismiss is true, called handleDismiss to close the wrapper modal
        if ((e.target === overlay.current) && handleDismiss) {
            handleDismiss();
        }
    },[handleDismiss, overlay]);
    
    //the Modal start with an overlay wrapper that will render above the homepage
    //user click the Create Work -> CreateProject is called -> the Modal is called
    //above the overlay, will have a wrapper modal that contain the children
    return (
        <div ref={overlay} className="modal" onClick={handleClick}>
            <button type="button" onClick={handleDismiss} className="absolute top-4 right-8">
                <Image src="/close.svg" width={17} height={17} alt="close" />
            </button>

            <div ref={wrapper} className="modal_wrapper">
                {/* to display whatever is included between the opening and closing tags when invoking a component. 
                    in the CreateProject component, there is a <h3> text, remove the children here will remove 
                    the rendering of that particular text*/}
                { children }
            </div>
        </div>
    )
}

export default Modal;