import React from 'react';
import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import { EventItem } from '../components/EventItem';

export const EventDetailPage = () => {

    // When using loader data from another component we need to call useRoutLoaderData()
    // instead of just useLoaderData(), and we have to put as an argument the id witch we 
    // named in the router component that has the specific loader
    const data = useRouteLoaderData('event-detail');

    return (
        <EventItem event={data.event} />
    );
};

export const eventItemLoader = async ({ request, params }) => {
    // { request, params } This comes from react router automaticaly
    const id = params.eventId;
    const response = await fetch('http://localhost:8070/events/' + id);

    if (!response.ok) {
        throw json(
            { message: 'Could not fetch details for selected event' },
            { status: 500 }
        );
    } else {
        return response;
    }
};

export const deleteEventAction = async ({ request, params }) => {
    const id = params.eventId;

    const response = await fetch('http://localhost:8070/events/' + id,{
        method: request.method
    });

    if (!response.ok) {
        throw json(
            { message: 'Could not delete event' },
            { status: 500 }
        );
    } 

    return redirect('/events');
};