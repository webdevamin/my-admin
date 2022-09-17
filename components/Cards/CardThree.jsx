import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardThree = ({ device, handleOpenDeleteModal }) => {
    const { id, data } = device;
    const { name, registered_at, last_logged_in } = data;

    return (
        <article className={`text-dark bg-light p-7 rounded-xl 
        mb-2 flex items-center justify-between`}>
            <div className={`flex flex-col gap-5`}>
                <h2 className={`font-bold`}>
                    {name ? name : `(Onbekend)`}
                </h2>
                <div className={`flex flex-col gap-1.5`}>
                    <span>
                        <strong>Aangemaakt:{' '}</strong>
                        <span>{registered_at ? registered_at : `(Onbekend)`}</span>
                    </span>
                    <span>
                        <strong>Laatst aangemeld:{' '}</strong>
                        <span>{last_logged_in ? last_logged_in : `(Onbekend)`}</span>
                    </span>
                </div>
            </div>
            <div className={`flex items-center justify-between`}>
                <FontAwesomeIcon icon="fa-solid fa-trash"
                    className={`icon cursor-pointer text-red bg-red 
                        transition hover:bg-opacity-80 box_shadow`}
                    data-id={id} onClick={() => handleOpenDeleteModal(id)} />
            </div>
        </article>
    )
}

export default CardThree