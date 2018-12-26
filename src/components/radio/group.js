import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Radio from './index';

import './radio.less';

const RadioGroup = (props) => {
  const [checkedId, setCheckedId] = useState(props.checkedId);
  const {radios, disabled, style, cls, getValue, id} = props;

  const singleRadioChange = (checkedId) => {
    setCheckedId(checkedId);
    if (getValue) getValue({[id]: checkedId});
  }

  return (
    <div style={style} className={cls}>
      {radios && radios.length > 0 ? (
        radios.map(item => {
          return (
            <Radio key={item.id} text={item.text} id={item.id}
                         checked={String(checkedId) === String(item.id)}
                         disabled={disabled} onChange={singleRadioChange}
            />
          )
        })
      ) : null}
    </div>
  )
}

RadioGroup.propTypes = {
  id: PropTypes.string,
  checkedId: PropTypes.string,
  disabled: PropTypes.bool,
  radios: PropTypes.array.isRequired,
  style: PropTypes.object,
  cls: PropTypes.string,
  getValue: PropTypes.func,
};

RadioGroup.defaultProps = {
  id: 'radioGroup',
  checkedId: '',
  disabled: false,
  style: {},
  cls: '',
  getValue: (obj) => {
    console.log(obj);
  }
}

export default RadioGroup;
