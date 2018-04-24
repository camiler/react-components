import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './countdown.less';

class CountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 59,
      text: '获取验证码',
      clicked: false,
      disabled: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.needReset) {
      this.reset();
    }
  }

  tick = () => {
    this.setState((prevState) => {
      return {
        seconds: prevState.seconds - 1,
        text: `(${prevState.seconds})重新获取`,
        disabled: true
      }
    });
  }

  reset = () => {
    clearInterval(this.timer);
    this.setState({text: this.props.text, seconds: 59, disabled: false});
  }

  startCount = () => {
    this.timer = setInterval(() => {
      if (this.state.seconds === 0) {
        this.reset();
      } else {
        this.tick();
      }
    }, 1000);
  }

  handleSmsClick = () => {
    const {beforeCount} = this.props;
    this.setState({clicked: true, disabled: true});
    if (beforeCount) {
      beforeCount();
    }
    this.startCount();
  }

  render () {
    const {disabled, text} = this.state;
    const {style} = this.props;
    return (
      <button type="button" style={style} className={classnames('sms-btn', {'btn-disabled': disabled})} onClick={this.handleSmsClick} disabled={disabled}>{text}</button>
    )
  }
}

CountDown.propTypes = {
  needReset: PropTypes.bool,
  text: PropTypes.string,
  beforeCount: PropTypes.func,
  style: PropTypes.object,
}

CountDown.defaultProps = {
  needReset: false,
  text: '获取验证码',
  beforeCount: () => {},
  style: {},
}

export default CountDown;
