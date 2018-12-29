import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import './toast.less';

const Toast = (props) => {
  //const [show, setShow] = useState(false);
  const documentMoveHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const toastTimerRef = useRef();
  useEffect(() => {
    if (props.show) {
      document.body.addEventListener('touchmove', documentMoveHandler, false);
      document.body.addEventListener('wheel', documentMoveHandler, false);
    }
    const id = setTimeout(() => {
      document.body.removeEventListener('touchmove', documentMoveHandler, false);
      document.body.removeEventListener('wheel', documentMoveHandler, false);
    }, 2600);
    toastTimerRef.current = id;
    return () => clearTimeout(toastTimerRef.current);
  }, [props.show])

  if (props.show) {
    return (
      <div
        className="flex boxCenter fixedMask toast-panel"
      >
        {props.msg ? (
          <div className="toast-content">{props.msg}</div>
        ) : null}
      </div>
    )
  }
  return null;
}

Toast.defaultProps = {
  msg: '弹出消息文本',
  show: false,
  scroll: false,
};

Toast.propTypes = {
  msg: PropTypes.string,
  show: PropTypes.bool,
  scroll: PropTypes.bool
};

export default Toast;
