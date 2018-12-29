import React, {Component, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './select.less';
const Select = (props) => {
  const [selectedValue, setSelectedValue] = useState(props.selectedValue || props.placeholder);
  const [gray, setGray] = useState(props.selectedValue === props.placeholder || props.selectedValue === '');
  let requiredObj = null;
  (props.rule || []).forEach((ruleItem) => {
    if (ruleItem.required) {
      requiredObj = ruleItem;
    }
  });

  const renderList = (list) => {
    if (!list || list.size === 0) {
      return null;
    }
    const {optName, optKey} = props;
    return list.map((item) => {
      return (
        <option key={item[optKey]} value={item[optKey]}>
          {item[optName]}
        </option>
      );
    });
  }

  const selectedHandler = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === props.placeholder || selectedValue === '') {
      setGray(true);
    } else {
      props.getValue({[props.id]: selectedValue});
      const required = requiredObj && requiredObj.required || null;
      if (required && !selectedValue.trim()) {
        props.setError(requiredObj.message)
      } else {
        props.setError('');
      }
      setGray(false);
      setSelectedValue(selectedValue);
    }
  }

  return (
    <div className={classnames('form-select', props.cls)}>
      <select name={props.id} id={props.id}
              className={classnames({gray})}
              onChange={selectedHandler}
              value={selectedValue}
      >
        <option value={props.placeholder} disabled>{props.placeholder}</option>
        {renderList(props.list)}
      </select>
    </div>
  )
}

Select.propTypes = {
  id: PropTypes.string,
  selectedValue: PropTypes.string,
  placeholder: PropTypes.string,
  list: PropTypes.array,
  cls: PropTypes.string,
  optName: PropTypes.string,
  optKey: PropTypes.string,
  rule: PropTypes.array,
  getValue: PropTypes.func,
  setError: PropTypes.func,
};

export default Select;


