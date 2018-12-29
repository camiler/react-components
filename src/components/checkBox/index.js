import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './checkbox.less';

const CheckBox = (props) => {
  const [checked, setChecked] = useState(props.checked);

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked])

  const boxCheck = () => {
    const {disabled, getValue, id} = props;
    if (!disabled) {
      if (getValue) getValue({[id]: !checked});
      setChecked(!checked);
    }
  }

  return (
    <div className="checkBox-wrap flex boxAlignStart" style={props.style}>
      <label className={classnames('outer', {checked, disabled: props.disabled})} onClick={boxCheck}>
        <span className="inner"></span>
      </label>
      <div className="text flexBox">{props.text}</div>
    </div>
  )
}

CheckBox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  text: PropTypes.node,
  id: PropTypes.string, //key 唯一标志 相当于表单项的name
  getValue: PropTypes.func,
  style: PropTypes.object
};

CheckBox.defaultProps = {
  checked: false,
  disabled: false,
  text: '',
  id: 'checkbox',
  style: {},
  getValue: (obj) => {console.log(obj)}
}

export default CheckBox;
