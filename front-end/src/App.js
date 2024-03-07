// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import MainNavigation from './components/MainNavigation';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home, Events, EventDetail, NewEvent, EditEvent, EvetnsRoot } from './pages/index';

const Layout = () => {
    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    );
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            {
                path: 'events',
                element: <EvetnsRoot />,
                children: [
                    {
                        index: true, element: <Events />, loader: async () => {
                            const response = await fetch('http://localhost:8070/events');

                            if (!response.ok) {
                                // TO DO...
                            } else {
                                const resData = await response.json();
                                return resData.events;
                            }
                        }
                    },
                    { path: ':eventId', element: <EventDetail /> },
                    { path: 'new', element: <NewEvent /> },
                    { path: ':eventId/edit', element: <EditEvent /> },
                ],
            },
        ],
    }
]);

function App() {
    return (
        <RouterProvider router={router}>

        </RouterProvider>
    );
}

export default App;
