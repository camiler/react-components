import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './input.less';
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.requiredObj = null;
    this.patternObj = null;
    this.rangeObj = null;
  }

  componentWillMount() {
    const {rule, initialValue} = this.props;
    this.setState({
      value: initialValue || ''
    });
    this.setRule(rule);
  }

  componentWillReceiveProps(nextProps) {
    this.setRule(nextProps.rule);
  }

  setRule = (rule) => {
    (rule || []).forEach((ruleItem) => {
      if (ruleItem.required) {
        this.requiredObj = ruleItem;
      }
      if (ruleItem.pattern) {
        this.patternObj = ruleItem;
      }
      if (ruleItem.range) {
        this.rangeObj = ruleItem;
      }
    });
  }

  inputHandler = (e) => {
    const value = e.target.value;
    let errorText = '';
    const pattern = this.patternObj && this.patternObj.pattern || null;
    const range = this.rangeObj && this.rangeObj.range || null;
    if (pattern && !pattern.test(value) && value) {
      errorText = this.patternObj.message;
    } else if (range && (Number(value) > Number(range[1]) || Number(value) < Number(range[0]))) {
      errorText = this.rangeObj.message;
    } else {
      errorText = '';
    }
    const {setError, id, getValue} = this.props;
    // if (checkZero) {
    //   value = Number(value) === 0 ? 0 : value;
    //   value =
    // }
    setError(errorText);
    this.setState({
      value,
    }, () => {
      if (errorText === '') {
        getValue({[id]: value.trim()}, value);
      } else {
        getValue({[id]: ''}, value);
      }
    });
  }

  inputBlur = (e) => {
    const required = this.requiredObj && this.requiredObj.required || null;
    const {value} = this.state;
    if (required && !value.trim()) {
      this.props.setError(this.requiredObj.message)
    }
    const {onBlur} = this.props;
    if (onBlur) onBlur(e);
  }

  inputFocus = (e) => {
    const {onFocus} = this.props;
    if (onFocus) onFocus(e);
  }

  render() {
    const {value} = this.state;

    const {id, placeholder, cls, disabled, type, maxlength} = this.props;
    return (
      <input type={type} maxLength={maxlength}
             className={classnames('form-input', cls, {disabled})} value={value}
             onBlur={this.inputBlur} onFocus={this.inputFocus} onChange={this.inputHandler}
             id={id} placeholder={placeholder} disabled={disabled}
      />
    )
  }
}

Input.propTypes = {
  id: PropTypes.string,
  rule: PropTypes.array,
  getValue: PropTypes.func,
  setError: PropTypes.func,
  cls: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  initialValue: PropTypes.string,
  type: PropTypes.string,
  maxlength: PropTypes.number,
  //checkZero: PropTypes.bool,
};

Input.defaultProps = {
  placeholder: '请输入',
  type: 'text',
  //checkZero: true
}

export default Input;

/**
 * rule [{pattern: /\d+/, message: ''}, {required: true, message: ''}]
 */

