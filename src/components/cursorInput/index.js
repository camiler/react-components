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
      visible: false,
      placeholder: '',
    }
  }

  handleInput = (e) => {
    const v = e.target.value;
    const newValue = v.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    this.setState({
      value: newValue
    })
    const {getValue} = this.props;
    if (getValue) getValue();
  }

  focus = () => {
    this.setState({
      visible: true,
    })
  }

  render () {
    const {visible, value} = this.state;
    const {cls, borderBottom, style, placeholder} = this.props;
    return (
      <div className={classnames('input-wrap', cls, {'bor-bottom1px': borderBottom})} onClick={this.focus} style={style}>
        <input type="tel" onKeyUp={this.handleInput} className="input" />
        <p className="show-wrap"><span className={classnames('content', {placeholder: value === ''})}>{visible ? value : placeholder}</span><span className={classnames('cursor', {visible})}></span></p>
      </div>
    )
  }
}

InputCard.propTypes = {
  cls: PropTypes.string,
  borderBottom: PropTypes.bool,
  style: PropTypes.object,
  getValue: PropTypes.func,
  placeholder: PropTypes.string
}

InputCard.defaultProps = {
  cls: '',
  borderBottom: true,
  style: {},
  placeholder: '请输入银行卡号',
  getValue: (value) => {console.log(value)}
}

export default InputCard;
