import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './radio.less';

const Radio = (props) => {
  const {disabled, onChange, id, checked, text} = props;
  const checkRadio = () => {
    if (!disabled) {
      if (onChange) onChange(id);
    }
  }

  return (
    <div className="radio-wrap" onClick={checkRadio}>
      <span className={classnames('outer', {checked, disabled})}>
        <span className="inner"></span>
      </span>
      <span className="text">{text || ''}</span>
    </div>
  )
}

Radio.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  id: PropTypes.string.isRequired, //key 唯一标志 也可以是value
  onChange: PropTypes.func,
};

export default Radio;
