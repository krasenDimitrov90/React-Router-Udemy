import { useLoaderData } from 'react-router-dom';
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
    const response = await fetch('http://localhost:8070/events');

    if (!response.ok) {
        // TO DO...
    } else {
        const resData = await response.json();
        return resData.events;
    }
};