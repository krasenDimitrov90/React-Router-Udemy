import React from 'react';
import { PageContent } from '../components/PageContent';
import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
    let error = useRouteError();

    let title = 'An error occured!';
    let message = 'Somthing went wrong!';

    if (error.status === 500) {
        // message = JSON.parse(error.data).message;

        // If we use json function from react router there is no need to parse the error
        // json does that for us.
        message = error.data.message;
    }
    if (error.status === 404) {
        title = 'Not found!';
        message = 'Could not find contents or page!';
    }
    return (
        <PageContent title={title}>
            <p>{message}</p>
        </PageContent>
    );
};
