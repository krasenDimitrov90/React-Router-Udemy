import { json, useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

export const Events = () => {
    const events = useLoaderData();


    return (
        <>
            <EventsList events={events} />
        </>
    );
}

export const eventsLoader = async () => {
    const response = await fetch('http://localhost:8070/eventsawd');

    if (!response.ok) {
        // Throwing an error will bubble up to he closest error element in the router
        // throw new Response(
        //     JSON.stringify({ message: 'Could not fetch events' }),
        //     { status: 500 }
        // );

        // This do the same as the above but with the json function from react router.
        throw json(
            { message: 'Could not fetch events' },
            { status: 500 },
        );
    } else {
        return response;
    }
};