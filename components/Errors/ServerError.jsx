import React from 'react'
import AlertError from '../AlertError'
import { Top } from '../Layout/Top'
import Seo from '../Seo'

const ServerError = ({ title, description }) => {
    return (
        <>
            <Seo title={title} description={description} />
            <Top />
            <AlertError classes={`mb-5`}
                description={'Er gings iets mis met het ophalen van gegevens. Probeer het later opnieuw.'} />
        </>
    )
}

export default ServerError;