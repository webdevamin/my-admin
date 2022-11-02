import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardThree = ({ device, handleOpenDeleteModal }) => {
    const { id, data } = device;
    const { last_logged_in } = data;

    return (
        <article className={`text-dark bg-light p-5 rounded-xl 
        mb-3 flex items-center justify-between`}>
            <div className={`flex flex-col gap-1`}>
                <div><strong>Laatst aangemeld</strong></div>
                <span>
                    {last_logged_in ? last_logged_in : `N/A`}
                </span>
            </div>
            <div className={`flex items-center justify-between`}>
                <FontAwesomeIcon icon="fa-solid fa-trash"
                    className={`icon cursor-pointer text-red bg-red 
                    transition hover:bg-opacity-90 shadow-alpha`}
                    data-id={id} onClick={() => handleOpenDeleteModal(id)} />
            </div>
        </article>
    )
}

export default CardThree