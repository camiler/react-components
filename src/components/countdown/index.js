import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './countdown.less';

const CountDown = (props) => {
  const [second, setSecond] = useState(59);
  const [clicked, setClicked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const timerRef = useRef();

  const reset = () => {
    clearTimeout(timerRef.current);
    setSecond(59);
    setDisabled(false);
    setClicked(false);
  }

  useEffect(() => {
    if (second === 0 || props.needReset) { //结束 reset
      reset();
    }
    if (clicked && second !== 0) {
      timerRef.current = setTimeout(() => {
        setSecond(second - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timerRef.current);
      unReset();
    }
  }, [second, clicked, props.needReset]);

  const unReset = () => {
    if (props.needReset) {
      if (props.triggerUnReset) props.triggerUnReset();
      else {
        throw new Error('Need Both "needReset" and "triggerUnReset" to call reset');
      }
    }
  }

  const handleSmsClick = () => {
    setDisabled(true);
    if (props.beforeCount) {
      props.beforeCount();
    }
    setClicked(true);
  }

  return (
    <button type="button" style={props.style}
            className={classnames('sms-btn', {'btn-disabled': disabled})}
            onClick={handleSmsClick}
            disabled={disabled}>
      {clicked ? `(${second})重新获取` : props.text}
    </button>
  );
}

CountDown.propTypes = {
  text: PropTypes.string,
  beforeCount: PropTypes.func,
  style: PropTypes.object,
  needReset: PropTypes.bool,
  triggerUnReset: PropTypes.func,
}

CountDown.defaultProps = {
  text: '获取验证码',
  beforeCount: () => {},
  style: {},
  needReset: false,
}

export default CountDown;
