import { Link, useSubmit } from 'react-router-dom';
import classes from './EventItem.module.css';

export const EventItem = ({ event }) => {
  const submit = useSubmit();

  function startDeleteHandler() {
    const procceed = window.prompt('Are you shure?');

    if (procceed) {
      // This will execute the deleteEventAction in route EventDetailPage
      submit(null, { method: 'delete' });
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to={'edit'}>Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}