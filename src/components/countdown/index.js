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
    this.setState({
      text: nextProps.text
    })
  }

  /**
   * 在父组件中 手机号输入动态改变后 重置计时器
   * 同时检查按钮是否已经点击过 防止在第一次输入完手机号就重置显示
   */
  componentWillReceiveProps() {
    if( this.props.needReset && this.state.clicked ){
      this.reset();
    }
  }

  tick = () => {
    this.setState((prevState) => {
      return {
        seconds: prevState.seconds - 1,
        text: prevState.seconds + '秒',
        disabled: true
      }
    }, () => {
      if (this.state.seconds == 0){
        this.reset();
      }
    });
  }

  reset = () => {
    clearInterval(this.timer);
    this.setState({text: this.props.text, seconds: 59, disabled: false});
  }

  startCount = () => {
    this.setState({clicked: true, disabled: true});
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
  }

  handleSmsClick = () => {
    const {beforeCount} = this.props;
    if (beforeCount) {
      const beforeRes = beforeCount();
      if (beforeRes) {
        this.startCount();
      }
    } else {
      this.startCount();
    }
  }

  render () {
    const {disabled, text} = this.state;
    const {style} = this.props;
    return (
      <button type="button" style={style} className={classnames('btn sms-btn', {'btn-disabled': disabled})} onClick={this.handleSmsClick} disabled={disabled}>{text}</button>
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
  beforeCount: () => {return true},
  style: {}
}

export default CountDown;
