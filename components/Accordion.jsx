import React, { useState } from 'react'

const Accordion = ({ device }) => {
    const { name, registered_at, last_logged_in } = device;
    const [toggleAccordion, setToggleAccordion] = useState(false);

    const handleClick = () => {
        setToggleAccordion(toggleAccordion => !toggleAccordion);
    }

    return (
        <article className={`text-dark bg-light p-4 rounded-xl 
        mb-2 px-6`} onClick={handleClick}>
            <div className={`flex justify-between w-full relative`}>
                <h2 className={`opacity-100 font-semibold`}>
                    {name ? name : `(Onbekend)`}
                </h2>
                <div className={`cursor-pointer
                before:content-['l'] before:rotate-90
                after:transition-all after:content-['l'] 
                after:top-0 before:top-0.5px before:right-0
                after:absolute before:absolute
                after:right-0.5px
                ${toggleAccordion && `after:rotate-90 after:top-0.5px`}`} />
            </div>
            <div className={`mt-5 text-sm flex flex-col gap-1.5 
            overflow-hidden transition-all 
            ${toggleAccordion ? `mt-5 h-auto` : `mt-0 h-0`}`}>
                <span><strong>Aangemaakt</strong>: {registered_at}</span>
                <span><strong>Laatst aangemeld</strong>: {last_logged_in}</span>
            </div>
        </article>
    )
}

export default Accordion