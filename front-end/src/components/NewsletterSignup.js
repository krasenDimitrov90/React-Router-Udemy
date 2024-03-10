import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {

  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === 'idle' && data?.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  /* With the help of fetcher.Form we can use an action from a different route
  without transitioning to that route, so to say to execute the action from another route
  but to stay on the same route that we currently are */
  return (
    <fetcher.Form
      method="post"
      // We explicitly tell that we want to execute an action that belongs
      // to the /newsletter route, in our case that is the newsletterAction - can be seen in App.js
      action='/newsletter'
      className={classes.newsletter}>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;