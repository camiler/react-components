import React, {useEffect, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import './loading.less';

const Loading = (props) => {
  const documentMoveHandler = (event) => {
    console.log('moving')
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    if (props.show) {
      document.body.addEventListener('touchmove', documentMoveHandler);
      document.body.addEventListener('wheel', documentMoveHandler);
    } else {
      console.log('remove')
      document.body.removeEventListener('wheel', documentMoveHandler);
      document.body.removeEventListener('touchmove', documentMoveHandler);
    }
  }, [props.show]);

  if (props.show) {
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
  show: PropTypes.bool,
  scroll: PropTypes.bool,
};

Loading.defaultProps = {
  show: false,
  scroll: false
}

export default Loading;
