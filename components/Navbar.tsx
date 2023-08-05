import Link from "next/link";
import Image from "next/image"

import { NavLinks } from "@/constants";
import AuthProviders from "./AuthProviders";



const Navbar = () => {

    const session = null;

    return (
        <nav className="flexBetween navbar">
            <div className="flex-1 flexStart gap-10">
                <Link href="/">
                    <Image src="/logo.svg" width={115} height={43} alt="logo"/>
                </Link>
                {/* iterate all of the navigation links from the constant folder */}
                <ul className="xl:flex hidden text-small gap-7">
                    {NavLinks.map((link) => (
                        <Link href={link.href} key={link.key}>
                            {link.text}
                        </Link>
                    ))}
                </ul>
            </div>

            {/* if user is logged in, user can see the profile photo and post their works, if not, user will see the sign in option */}
            <div className="flexCenter gap-4">
                {session ? (
                    <>
                        UserPhoto
                        <Link href="/create-project">
                            Share Work
                        </Link>
                    </>
                ) : (
                    <AuthProviders />
                )}
            </div>
        </nav>
    )
}

export default Navbar;