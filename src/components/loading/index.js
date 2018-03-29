import React from 'react';
import PropTypes from 'prop-types';
import './loading.less';

const Loading = (props) => {
  const {show} = props;
  if (show) {
    return (
      <div
        className="flex loading-wrap fixedMask boxCenter"
      >
        <div className="loading"></div>
      </div>
    )
  }
  return null;
}

Loading.propTypes = {
  show: PropTypes.bool
};

Loading.defaultProps = {
  show: false
}

export default Loading;
