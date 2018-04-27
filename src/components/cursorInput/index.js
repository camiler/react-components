/**
 * by camiler
 * 长数字 空格间隔 模拟光标
 */
import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './input.less';

class InputCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      showPlaceholder: true,
      visible: false,
      placeholder: '',
    }
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


  handleInput = (e) => {
    const v = e.target.value;
    let errorText = '';
    const pattern = this.patternObj && this.patternObj.pattern || null;
    const range = this.rangeObj && this.rangeObj.range || null;
    if (pattern && !pattern.test(v) && v) {
      errorText = this.patternObj.message;
    } else if (range && (Number(v) > Number(range[1]) || Number(v) < Number(range[0]))) {
      errorText = this.rangeObj.message;
    } else {
      errorText = '';
    }
    const {setError, id, getValue} = this.props;
    if (setError) setError(errorText);
    const newValue = v.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    this.setState({
      value: newValue,
      oriValue: v
    });
    if (errorText === '') {
      getValue({[id]: v.trim()}, v);
    } else {
      getValue({[id]: ''}, v);
    }
  }

  focus = () => {
    this.setState({
      visible: true,
      showPlaceholder: false
    })
  }

  blur = () => {
    const showPlaceholder = !this.state.value;
    this.setState({
      visible: false,
      showPlaceholder,
    })
  }

  render () {
    const {visible, value, showPlaceholder} = this.state;
    const {cls, borderBottom, style, placeholder} = this.props;
    return (
      <div className={classnames('input-wrap', cls, {'bor-bottom1px': borderBottom})} style={style}>
        <input type="tel" onInput={this.handleInput} className="input" onBlur={this.blur} onFocus={this.focus}/>
        <p className="show-wrap">
          <span className={classnames('content', {placeholder: showPlaceholder})}>{showPlaceholder ? placeholder : value}</span>
          <span className={classnames('cursor', {visible})}></span>
        </p>
      </div>
    )
  }
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
}

InputCard.defaultProps = {
  cls: '',
  borderBottom: true,
  style: {},
  placeholder: '请输入银行卡号',
  getValue: (value) => {
    console.log(value)
  }
}

export default InputCard;
