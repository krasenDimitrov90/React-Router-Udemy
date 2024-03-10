import { Form, useActionData, useNavigate, useNavigation, json, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

export const EventForm = ({ method, event }) => {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  console.log(data?.errors);

  return (
    <Form method={method} className={classes.form}>
      {/* Here the data is comming from the eventActions. If the server respond with 
      an errors eventActions return the response and the data is that response.
      This is made so to stay on the same page and to handle the errors and to show to
      the user that something is wrong*/}
      {data && data.errors && <ul>
        {Object.values(data.errors).map(err => {
          return <li key={err}>{err}</li>;
        })}
      </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title"
          defaultValue={event ? event.title : ''}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image"
          defaultValue={event ? event.image : ''}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date"
          defaultValue={event ? event.date : ''}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5"
          defaultValue={event ? event.description : ''}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting} >
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export const eventActions = async ({ request, params }) => {
  const data = await request.formData();

  const enteredData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  let url = 'http://localhost:8070/events';
  if (request.method === 'PATCH') {
    let eventId = params.eventId;
    url = 'http://localhost:8070/events/' + eventId;
  }

  const response = await fetch(url, {
    method: request.method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(enteredData)
  });

  if (response.status === 422) {
    /* Here the response has an error object send by the Server */
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save event' }, { status: 500 });
  }

  return redirect('/events');
};