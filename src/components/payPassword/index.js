import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './password.less';

class PayPassword extends Component{
  constructor (props) {
    super(props);
    this.pwdInputRef = React.createRef();
    this.state = {
      active: new Array(6).fill(false),
      hasBeenFocused: false,
      value: ''
    }
  }

  componentDidUpdate() {
    const { hasBeenFocused } = this.state;

    if ( hasBeenFocused) {
      this.focusVisibleField();
    }
  }

  inputListen = (event) => {
    const {inputChange, inputEnd} = this.props;

    let val = event.target.value,
      valArr = val.split(''),
      actives = this.state.active;

    valArr.forEach((x, i)=>{
      if ( x ) {
        actives[i] = true;
      }
    })

    actives.forEach((item, j)=>{
      if ( j > valArr.length - 1 ) {
        actives[j] = false;
      }
    })

    this.setState({
      active: actives,
      value: val
    })

    inputChange &&  inputChange(val)

    if ( valArr.length == 6 ) {
      inputEnd && inputEnd(val);
    }
  }

  focusVisibleField = () => {
      this.pwdInputRef.current.focus();
  }

  inputFocus = () => {
    this.setState({ hasBeenFocused: true })
  }

  render () {

    const {style, cls, type, inputId } = this.props;
    const {value, active} = this.state;

    return (
        <div className={classnames("pwdWrap", type, cls)} style={style}>
            <label htmlFor={inputId} className="itemsWrap" onFocus={this.focusVisibleField}>
                {active.map(function(item, idx){
                    return <b className={classnames('pwdItem', type, {active: item})} key={idx}></b>;
                })}
            </label>
            <input type="tel" autoComplete="off" value={value} onFocus={this.inputFocus} id={inputId}
                   ref={this.pwdInputRef} onInput={this.inputListen} maxLength={6}
            />
        </div>
    )
  }
}

PayPassword.propTypes = {
  style: PropTypes.object,
  cls: PropTypes.string,
  type: PropTypes.string,
  inputId: PropTypes.string,
  inputChange: PropTypes.func,
  inputEnd: PropTypes.func,
}

PayPassword.defaultProps = {
  style: {},
  cls: '',
  type: 'big',
  inputId: 'pay-password',
  inputChange: (value) => {console.log(value)},
  inputEnd: () => {}
}

export default PayPassword;
