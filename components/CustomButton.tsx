import { MouseEventHandler } from "react";
import Image from "next/image";

type Props = {
    title: string,
    leftIcon?: string | null, //sometimes can be there, sometimes not
    rightIcon?: string | null, //sometimes can be there, sometimes not
    handleClick?: MouseEventHandler,
    isSubmitting?: boolean,
    type?: "button" | "submit",
    bgColor?: string,
    textColor?: string,
}

const CustomButton = ({ title, leftIcon, rightIcon, handleClick, isSubmitting, type, bgColor, textColor }: Props) => {
    return (
        <button
            type={type || "button"}
            disabled={isSubmitting}
            //bgColor and textColor is added inside className by changing it to a dynamic template string
            //if user is submitting, background colour -> black, else use bgColor
            //for bgColor, if bgColor exist -> use the bgColor, else use the latter -> purple
            //another way to write can be -> ${textColor || "text-white"}
            className= {`flexCenter gap-1 px-4 py-3 
            ${textColor ? textColor : "text-white"} 
            ${isSubmitting ? "bg-black/50" : bgColor ? bgColor : "bg-primary-purple"} 
            rounded-xl text-sm font-medium max-md:w-full`}
            onClick={handleClick}
        >
            {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left icon" />}
            {title}
            {rightIcon && <Image src={rightIcon} width={14} height={14} alt="right icon" />}

        </button>
    )
}

export default CustomButton;