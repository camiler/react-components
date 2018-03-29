import React, { Component } from 'react';

import './countdown.less';

class CountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 5,
      deg: '',
    };
  }
  componentDidMount() {
    this.countdown()
  }
  countdown = () => {
    const countdown = setInterval(() => {
      const deg = Math.round(this.state.seconds / 10 * 465);
      const circleDom = this.refs.secondCircle;
      circleDom.style.strokeDashoffset = deg - 465;
      this.setState((preState) => ({
        seconds: preState.seconds - 1,
        deg: preState.deg,
    }), () => {
      if (this.state.seconds === 1) {
        clearInterval(countdown);
      }
    });
    }, 1000)
  }

  render () {
    return (<div className='timeout-countdown'>
      <svg className="alert-circle" width="100%" height="3rem">
        <circle cx="50%" cy="50%" r="1.08rem" fill="#FFF" stroke="#F4F1F1" strokeWidth=".17rem"></circle>
        <circle ref="secondCircle" id="js-sec-circle" 
        className="alert-sec-circle" cx="50%" cy="50%" r="1.08rem" fill="transparent" stroke="#43AEFA" strokeWidth=".20rem" transform="rotate(0 0 0)"></circle>
      </svg>
      <div ref="secondDom" className="alert-sec-text">{this.state.seconds}<span className='seconds-title'>秒</span></div>
    </div>)
  }
}

export default CountDown;
