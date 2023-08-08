import Link from "next/link";
import Image from "next/image";

import { NavLinks } from "@/constants";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";
import ProfileMenu from "./ProfileMenu";



const Navbar = async () => {

    const session = await getCurrentUser();
    console.log(session)

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

            {/* the Navbar component is server side rendered, however, not 
                all components are appropriate to be server sider rendered
                as some should stay as client component. 

                thus, we create a new component that is client side rendered
                and import them to the server side rendered component.
                
                for example ProfileMenu is imported inside the Navbar*/}

            <div className="flexCenter gap-4">
                {/* if user is logged in, user can see the profile photo and 
                    post their works, if not, user will see the sign in option */}
                {session?.user ? (
                    <>
                        <ProfileMenu session={session} />
                        <Link href="/create-project">
                            Create Work
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