import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';

const CardTwo = ({ item }) => {
    const { title, description, price, image } = item;

    return (
        <article className={`rounded-2xl flex justify-between 
        p-5 mb-3 shadow-sm items-center bg-emerald-100 gap-3`}>
            <div className={`flex justify-center items-center gap-6`}>
                <Image src={image} width={80} height={80}
                    alt={title} className={`rounded-full`} />
                <div className="info">
                    <h2>{title}</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`text-sm font-medium`}>
                            {description}
                        </span>
                    </div>
                    <div className="font-bold mt-2 text-emerald-700">
                        {price}
                    </div>
                </div>
            </div>
            <FontAwesomeIcon icon="fa-solid fa-angle-right"
                className="icon more_btn cursor-pointer 
                transition hover:bg-opacity-80 shadow-alpha
                bg-emerald-500 text-emerald-500" />
        </article>
    )
}

export default CardTwo