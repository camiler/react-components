import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './loading.less';

const Loading = (props) => {
  const documentMoveHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    if (!props.scroll) {
      if (props.show) {
        document.body.addEventListener('touchmove', documentMoveHandler, false);
        document.body.addEventListener('wheel', documentMoveHandler, false);
      } else {
        //todo: fix 这里没有起作用？
        document.body.removeEventListener('touchmove', documentMoveHandler, false);
        document.body.removeEventListener('wheel', documentMoveHandler, false);
      }
    }
  });

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
