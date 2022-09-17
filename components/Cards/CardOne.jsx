import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardOne = ({ reservation, handleOpen }) => {
    const { id, data } = reservation;
    const { name, phone, reservation_time, date_submitted, units } = data;

    return (
        <article className={`bg-light rounded-2xl flex justify-between 
        p-5 mb-3 shadow-sm items-center`}>
            <div className={`flex justify-center items-center gap-5`}>
                <div className={`bg-dark h-10 w-10 p-6 rounded-full 
      flex items-center justify-center font-semibold 
      text-2xl text-dark box_shadow`}>
                    <span className={`text-white`}>
                        {units}
                    </span>
                </div>
                <div className="info">
                    <h2>{name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <FontAwesomeIcon icon="fa-solid fa-phone"
                            className="text-xs" />
                        <a href={`tel:${phone}`}>{phone}</a>
                    </div>
                    <div className={`flex gap-8 mt-2 pt-2 border-t 
                    border-t-theme border-opacity-20`}>
                        <div className={`flex items-center gap-2`}>
                            <FontAwesomeIcon icon="fa-solid fa-clock"
                                className="text-xs" />
                            <span className={`text-sm font-bold`}>
                                {date_submitted.split(" ")[1]}
                            </span>
                        </div>
                        <div className={`flex items-center gap-2`}>
                            <FontAwesomeIcon icon="fa-solid fa-utensils"
                                className="text-xs" />
                            <span className={`text-sm font-bold`}>
                                {reservation_time}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <FontAwesomeIcon icon="fa-solid fa-trash"
                className={`icon cursor-pointer text-red bg-red 
                transition hover:bg-opacity-80 box_shadow`}
                data-id={id} onClick={() => handleOpen(id)} />
        </article>
    )
}

export default CardOne