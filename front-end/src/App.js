import MainNavigation from './components/MainNavigation';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage, EventsPage, ErrorPage, EventDetailPage, NewEventPage, EditEventPage, EvetnsRoot, eventItemLoader } from './pages/index';
import { eventsLoader, deleteEventAction } from './pages/index';
import { eventActions } from './components/EventForm';
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
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EvetnsRoot />,
        children: [
          { index: true, element: <EventsPage />, loader: eventsLoader },
          {
            path: ':eventId',
            // This aproach with id and loader allows us to use the loader in another components
            // by calling useRouteLoaderData() in the components we need the data from the loader
            id: 'event-detail',
            loader: eventItemLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction
              },
              { path: 'edit', element: <EditEventPage />, action: eventActions },
            ],
          },
          { path: 'new', element: <NewEventPage />, action: eventActions },
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
