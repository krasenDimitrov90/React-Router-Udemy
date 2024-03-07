import React from 'react';
import { useParams } from 'react-router-dom';

export const EventDetail = () => {

    const params = useParams();

    return (
        <>
            <h1>Event Detail</h1>
            <p>Event ID: {params.eventId}</p>
        </>
    );
};
