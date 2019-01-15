import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './formItem.less';

const FormItem = (props) => {
  const [errorText, setErrorText] = useState('');

  const setError = (errorText) => {
    setErrorText(errorText);
  }

  const renderChildren = (children) => {
    const {rule, getValue, idFor} = props;
    return React.Children.map(children, (child) => {
      if (child && typeof child.type === 'function' && !child.props.size) {
        return React.cloneElement(child, {rule, getValue, setError, id: idFor});
      }
      return child;
    });
  }

  const {label, idFor, children, labelWidth, disabled, border, horizontal} = props;
  if (!label) {
    return (
      <div className={classnames('form-item', {'bor-bottom1px': border}, {disabled})}>
        {renderChildren(children)}
      </div>
    )
  }
  return (
    <div className={classnames('form-item', {'bor-bottom1px': border}, {disabled})}>
      {
        horizontal ? (
          <div className="item-control flex">
            <label htmlFor={idFor} className="item-label" style={{width: labelWidth}}>{label}</label>
            <div className="flexBox item-wrap">
              {renderChildren(children)}
              {errorText && <p className="item-info flex"><i className="icon icon-error-info"></i><span className="flexBox">{errorText}</span></p>}
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor={idFor} className="item-label" style={{width: '100%'}}>{label}</label>
            <div className="flex item-wrap">
              {renderChildren(children)}
            </div>
            {errorText && <p className="item-info flex"><i className="icon icon-error-info"></i><span className="flexBox">{errorText}</span></p>}
          </div>
        )
      }
    </div>
  )
}

FormItem.propTypes = {
  label: PropTypes.string,
  idFor: PropTypes.string,
  children: PropTypes.node,
  rule: PropTypes.array,
  getValue: PropTypes.func,
  labelWidth: PropTypes.string,
  disabled: PropTypes.bool,
  border: PropTypes.bool,
  horizontal: PropTypes.bool
};

FormItem.defaultProps = {
  disabled: false,
  border: true,
  horizontal: true
}

export default FormItem;

/**
 * rule [{pattern: /\d+/, message: ''}, {required: true, message: ''}]
 */

