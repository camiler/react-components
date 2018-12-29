import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './input.less';

const setRule = (rule) => {
  let obj = {};
  (rule || []).forEach((ruleItem) => {
    if (ruleItem.required) {
      obj = {requireObj: ruleItem, ...obj};
    }
    if (ruleItem.pattern) {
      obj = {patternObj: ruleItem, ...obj};
    }
    if (ruleItem.range) {
      obj = {rangeObj: ruleItem, ...obj};
    }
  });
  return obj;
}

const Input = (props) => {
  const [value, setValue] = useState(props.initialValue);
  const [ruleObj, setRuleObj] = useState(setRule(props.rule));

  const inputHandler = (e) => {
    const value = e.target.value;
    let errorText = '';
    const {patternObj, rangeObj} = ruleObj;
    const pattern = patternObj && patternObj.pattern || null;
    const range = rangeObj && rangeObj.range || null;
    if (pattern && !pattern.test(value) && value) {
      errorText = patternObj.message;
    } else if (range && (Number.isNaN(Number(value))
        || Number(value) > Number(range[1])
        || Number(value) < Number(range[0])
      )) {
      errorText = rangeObj.message;
    } else {
      errorText = '';
    }
    if (props.setError) {
      props.setError(errorText);
    }
    setValue(value);
    if (errorText === '') {
      props.getValue({[`${props.id}`]: value.trim()}, value);
    } else {
      props.getValue({[`${props.id}`]: ''}, value);
    }
  }

  const inputBlur = (e) => {
    const required = ruleObj.requiredObj && ruleObj.requiredObj.required || null;
    if (required && !value.trim()) {
      if (props.setError) {
        props.setError(ruleObj.requiredObj.message);
      }
    }
    if (props.onBlur) props.onBlur(e);
  }

  useEffect(() => {
    setRuleObj(setRule(props.rule));
  }, [props.rule])

  return (
    <input value={value} className={classnames('form-input', props.cls, {disabled: props.disabled})}
           onBlur={inputBlur} onFocus={props.onFocus} onChange={inputHandler}
           {...props.other}
    />
  )
}

Input.propTypes = {
  rule: PropTypes.array,
  getValue: PropTypes.func,
  setError: PropTypes.func,
  cls: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  initialValue: PropTypes.any,
  type: PropTypes.string,
  //checkZero: PropTypes.bool,
};

Input.defaultProps = {
  placeholder: '请输入',
  type: 'text',
}

export default Input;

/**
 * rule [{pattern: /\d+/, message: ''}, {required: true, message: ''}]
 */

