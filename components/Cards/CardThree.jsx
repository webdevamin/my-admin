import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardThree = ({ device, handleOpenDeleteModal }) => {
    const { id, data } = device;
    const { registered_at, last_logged_in } = data;

    return (
        <article className={`text-dark bg-light p-7 rounded-xl 
        mb-2 flex items-center justify-between`}>
            <div className={`flex flex-col gap-5`}>
                <div className={`flex flex-col gap-2`}>
                    <div>
                        <div><strong>Aangemaakt op</strong></div>
                        <span>
                            {registered_at ? registered_at : `N/A`}
                        </span>
                    </div>
                    <div>
                        <div><strong>Laatst aangemeld</strong></div>
                        <span>
                            {last_logged_in ? last_logged_in : `N/A`}
                        </span>
                    </div>
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