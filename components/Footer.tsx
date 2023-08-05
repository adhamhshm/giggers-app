import Image from "next/image";
import Link from "next/link";

import { footerLinks } from "@/constants";

//define the type for ColumnProps
type ColumnProps = {
    title: string;
    links: Array<string>;
}

//this can act as a utility component or a helper component, will only be used inside the footer only
//we define the parameter needed that is for the type -> ColumnProps
//remember to define the type -> ColumnProps
const FooterColumn = ({ title, links }: ColumnProps) => (
    <div className="footer_column">
        <h4 className="font-semibold">{title}</h4>
        <ul className="flex flex-col gap-2 font-normal">
            {links.map((link) =>
                <Link href="/" key={link}>
                    {link}
                </Link> 
            )}
        </ul>
    </div>
)

const Footer = () => {
    return (
        <footer className="flexStart footer">
            {/* to contain the logo, short desc and the list of links by its part */}
            <div className="flex flex-col gap-12 w-full">
                {/* to contain logo and a short desc */}
                <div className="flex items-start flex-col">
                    <Image src="/logo-purple.svg" width={115} height={38} alt="logo"/>
                    <p className="text-start text-sm font-normal mt-5 max-w-xs">
                        World leading platform for gig workers!
                    </p>
                </div>

                {/* to contain the list of relevant links in by column */}
                <div className="flex flex-wrap gap-12">
                    {/* get footerLinks from the "./constant/index.ts" and pass to the FooterColumn component */}
                    {/* the FooterColumn will render the data it gets */}

                    {/* the 1st part of the column */}
                    <FooterColumn title={footerLinks[0].title} links={footerLinks[0].links} />

                    {/* to contain 2 column together (stacked together) but still is inside the main div */}
                    <div className="flex-1 flex flex-col gap-4">
                        {/* the 2nd part of the column */}
                        <FooterColumn title={footerLinks[1].title} links={footerLinks[1].links} />
                        {/* the 3rd part of the column */}
                        <FooterColumn title={footerLinks[2].title} links={footerLinks[2].links} />
                    </div>

                    {/* the 4th part of the column */}
                    <FooterColumn title={footerLinks[3].title} links={footerLinks[3].links} />

                    {/* the same repetition like upper div where the 2 column stacked */}
                    <div className="flex-1 flex flex-col gap-4">
                        {/* the 5th part of the column */}
                        <FooterColumn title={footerLinks[4].title} links={footerLinks[4].links} />
                        {/* the 6th part of the column */}
                        <FooterColumn title={footerLinks[5].title} links={footerLinks[5].links} />
                    </div>

                    {/* the 7th part of the column */}
                    <FooterColumn title={footerLinks[6].title} links={footerLinks[6].links} />
                </div>
            </div>

            {/* to contain the info of bottom part of the footer, separated by the info above */}
            <div className="flexBetween footer_copyright">
                <p>
                    @ 2023 Giggers. All Right Reserved  
                </p>
                <p className="text-gray">
                    <span className="text-black font-semibold">10000 </span>
                    projects submitted!
                </p>
            </div>
        </footer>
    )
}

export default Footer;