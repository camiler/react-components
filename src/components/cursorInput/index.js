import React, {useState, useEffect} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './input.less';

const isIos = (/iphone|ios|ipad|ipod/i).test(navigator.userAgent.toLowerCase());
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
const regInput = v => v.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');

const InputCard = (props) => {
  const [value, setValue] = useState(regInput(props.initialValue));
  const [showPlaceholder, setShowPlaceholder] = useState(!props.initialValue);
  const [visible, setVisible] = useState(false);
  const [ruleObj, setRuleObj] = useState(setRule(props.rule));

  useEffect(() => {
    setRuleObj(setRule(props.rule));
  }, [props.rule])


  const handleInput = (e) => {
    const v = e.target.value;
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
    const {setError, id, getValue, maxLength} = props;
    setError(errorText);
    const newValue = v.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    if (v.length <= maxLength) {
      setValue(newValue);
      if (errorText === '') {
        getValue({[id]: v.trim()}, v);
      } else {
        getValue({[id]: ''}, v);
      }
    }
  }

  const focus = () => {
    setVisible(true);
    setShowPlaceholder(false);
  }

  const blur = () => {
    setVisible(false);
    setShowPlaceholder(!value);
  }

  return (
    <div className={classnames('input-wrap', props.cls, {'bor-bottom1px': props.borderBottom})} style={props.style}>
      <input type="tel" onInput={handleInput} className="input" onBlur={blur} onFocus={focus} maxLength={props.maxLength} defaultValue={props.initialValue.replace(/\s+/g, '')}/>
      <p className="show-wrap">
        <span className={classnames('content', {placeholder: showPlaceholder})}>{showPlaceholder ? props.placeholder : value}</span>
        <span className={classnames('cursor', {ios: isIos}, {visible})}></span>
      </p>
    </div>
  )
}

InputCard.propTypes = {
  id: PropTypes.string,
  cls: PropTypes.string,
  borderBottom: PropTypes.bool,
  style: PropTypes.object,
  getValue: PropTypes.func,
  placeholder: PropTypes.string,
  rule: PropTypes.array,
  setError: PropTypes.func,
  maxLength: PropTypes.number,
  initialValue: PropTypes.string
}

InputCard.defaultProps = {
  cls: '',
  borderBottom: true,
  style: {},
  maxLength: 19,
  placeholder: '请输入银行卡号',
  getValue: (value) => {
    console.log(value)
  },
  setError: () => {},
  initialValue: ''
}

export default InputCard;
