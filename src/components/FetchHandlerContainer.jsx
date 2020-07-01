import React from 'react';
import PropTypes from 'prop-types';

const FetchHandlerContainer = ({ loading, error }) => {
  if (loading) return <h1>Loading...</h1>;
  if (!loading && error && <h4 className="data-error-container">{error}</h4>);
  return null;
};

FetchHandlerContainer.defaultProps = {
  error: '',
};

FetchHandlerContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default FetchHandlerContainer;
