import React, { Component } from 'react';

import Link from '../components/Link';

class FilterLink extends Component {
  /*
   Need to subscribe to store changes
   - So we will move subscription to the store to the React life cycle methods
   - forceUpdate: forces a re-rendering of the component. This is called anytime the store changes
    */
  componentDidMount() {
    const { store } = this.props;

    // Declaring the unsubscribe function in componentDidMount
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  // important to unsubscribe as well to clean up the subscription
  componentWillUnmount() {
    // this is the *return* value of the store.subscribe() method above in componentDidMount
    this.unsubscribe();
  }

  render() {
    const { props } = this;
    const { store } = props;
    const state = store.getState();

    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter,
          })
        }
      >
        {props.children}
      </Link>
    );
  }
}

export default FilterLink;