import React, { Suspense } from 'react';
import { Await, defer, json, redirect, useRouteLoaderData } from 'react-router-dom';
import { EventItem } from '../components/EventItem';
import EventsList from '../components/EventsList';

export const EventDetailPage = () => {

  // When using loader data from another component we need to call useRoutLoaderData()
  // instead of just useLoaderData(), and we have to put as an argument the id witch we 
  // named in the router component that has the specific loader
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }} >Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }} >Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

const loadEvent = async (id) => {
  // { request, params } This comes from react router automaticaly
  const response = await fetch('http://localhost:8070/events/' + id);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event' },
      { status: 500 }
    );
  } else {
    const data = await response.json();
    return data.event;
  }
};

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

export const eventItemLoader = async ({ request, params }) => {
  const id = params.eventId;
  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
};

export const deleteEventAction = async ({ request, params }) => {
  const id = params.eventId;

  const response = await fetch('http://localhost:8070/events/' + id, {
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