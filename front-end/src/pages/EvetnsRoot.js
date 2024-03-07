import React from 'react';
import EventsNavigation from '../components/EventsNavigation';
import { Outlet } from 'react-router-dom';

export const EvetnsRoot = () => {
    return (
        <>
            <EventsNavigation />
            <Outlet />
        </>
    );
};
