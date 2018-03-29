/**
 * 模拟光标
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
      visible: false
    }
  }

  handleInput = (e) => {
    const v = e.target.value;
    const newValue = v.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    this.setState({
      value: newValue
    })
  }

  focus = () => {
    this.setState({
      visible: true,
    })
  }

  render () {
    const {visible} = this.state;
    return (
      <div className="input-wrap" onClick={this.focus}>
        <input type="tel" onKeyUp={this.handleInput} className="input"/>
        <p className="show-wrap"><span className="content">{this.state.value}</span><span className={classnames('cursor', {visible})}></span></p>
      </div>
    )
  }
}


export default InputCard;
