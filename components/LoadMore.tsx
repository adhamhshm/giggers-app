"use client";

import { useRouter } from "next/navigation";

import CustomButton from "./CustomButton";

type Props = {
    hasPreviousPage: boolean
    hasNextPage: boolean
    startCursor: string
    endCursor: string
}


const LoadMore = ({ startCursor, endCursor, hasPreviousPage, hasNextPage }: Props) => {

    const router = useRouter();

    //to handle the navigation
    const handleNavigation = (direction: string) => {
        const currentParams = new URLSearchParams(window.location.search);
        
        if (direction === "next" && hasNextPage) {
            currentParams.delete("startCursor");
            currentParams.set("endCursor", endCursor);
        } 
        else if (direction === "prev" && hasPreviousPage) {
            currentParams.delete("endCursor");
            currentParams.set("startCursor", startCursor);
        }
    
        const newSearchParams = currentParams.toString();
        const newPathname = `${window.location.pathname}?${newSearchParams}`;
    
        router.push(newPathname);
    }

    return (
        <div className="w-full flexCenter gap-5 mt-10">
            {hasPreviousPage && (
                <CustomButton title="First Page" handleClick={() => handleNavigation("prev")} />
            )}
            {hasNextPage && (
                <CustomButton title="Next Page" handleClick={() => handleNavigation("next")} />
            )}
        </div>
    )
}

export default LoadMore;