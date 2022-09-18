import Link from 'next/link';
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LinkItem = ({ title, href, iconClasses }) => {
    return (
        <Link href={href}>
            <a className={`text-dark bg-light p-5 rounded-2xl 
            flex gap-4 items-center mb-2 last:mb-0 transition 
            hover:opacity-80`}>
                <FontAwesomeIcon icon={iconClasses} size="xl" />
                <span className={`opacity-100 font-semibold`}>
                    {title}
                </span>
            </a>
        </Link>
    )
}

export default LinkItem;