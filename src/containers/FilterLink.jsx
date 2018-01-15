import { connect } from 'react-redux';

import Link from '../components/Link';

/*
In this case, we need to compare the filter prop passed to FilterLink from Footer.jsx...
to the visibilityFilter in the Redux store's state.

To make it clear, we will rename it ownProps, which will indicate the container component's own
props. not the props passed to the child, which is the return value of mapStateToProps.
 */
const mapStateToProps = (
  state,
  ownProps,
) => {
  return {
    active: ownProps.filter === state.visibilityFilter,
  };
};

const mapDispatchToProps = (
  dispatch,
  ownProps,
) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter,
      });
    },
  };
};

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Link);

export default FilterLink;
