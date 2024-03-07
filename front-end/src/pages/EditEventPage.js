import React from 'react';
import { EventForm } from '../components/EventForm';
import { useRouteLoaderData } from 'react-router-dom';

export const EditEventPage = () => {

    const data = useRouteLoaderData('event-detail');

    return (
        <EventForm event={data.event} />
    );
};
