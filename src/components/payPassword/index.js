import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './password.less';

const PayPassword = (props) => {
  const pwdInputRef = useRef(null);
  const [active, setActive] = useState(new Array(6).fill(false));
  const [hasBeenFocused, setHasBeenFocused] = useState(false);
  const [value, setValue] = useState('');

  const focusVisibleField = () => {
    pwdInputRef.current.focus();
  }

  const inputListen = (event) => {
    const {inputChange, inputEnd} = props;

    let val = event.target.value,
      valArr = val.split('');

    valArr.forEach((x, i)=>{
      if ( x ) {
        active[i] = true;
      }
    })

    active.forEach((item, j)=>{
      if ( j > valArr.length - 1 ) {
        active[j] = false;
      }
    })
    setActive(active);
    setValue(val);

    inputChange &&  inputChange(val)

    if ( valArr.length == 6 ) {
      inputEnd && inputEnd(val);
    }
  }

  useEffect(() => {
    if (hasBeenFocused) {
      focusVisibleField()
    }
  }, [hasBeenFocused])

  return (
    <div className={classnames("pwdWrap", props.type, props.cls)} style={props.style}>
      <label htmlFor={props.inputId} className="itemsWrap" onFocus={focusVisibleField}>
        {active.map(function(item, idx){
          return <b className={classnames('pwdItem', props.type, {active: item})} key={idx}></b>;
        })}
      </label>
      <input type="tel" autoComplete="off" value={value} onFocus={() => setHasBeenFocused(true)} id={props.inputId}
             ref={pwdInputRef} onInput={inputListen} maxLength={6}
      />
    </div>
  )
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
