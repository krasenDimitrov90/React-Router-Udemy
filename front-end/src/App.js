import MainNavigation from './components/MainNavigation';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home, Events,ErrorPage, EventDetail, NewEvent, EditEvent, EvetnsRoot } from './pages/index';
import { eventsLoader } from './pages/index';

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
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            {
                path: 'events',
                element: <EvetnsRoot />,
                children: [
                    { index: true, element: <Events />, loader: eventsLoader },
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
