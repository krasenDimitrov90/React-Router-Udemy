import { Await, defer, json, useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

export const EventsPage = () => {
  const { events } = useLoaderData();


  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }} >Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

const loadEvents = async () => {
  const response = await fetch('http://localhost:8070/events');

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
    const data = await response.json();
    return data.events;
  }
};

export const eventsLoader = async () => {
  return defer({
    events: loadEvents()
  });
};