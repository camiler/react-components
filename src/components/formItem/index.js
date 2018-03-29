import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './formItem.less';

class FormItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      errorText: '',
    };
  }

  setError = (errorText) => {
    this.setState({errorText})
  }

  renderChildren = (children) => {
    const {rule, getValue, idFor} = this.props;
    return React.Children.map(children, (child) => {
      if (child && typeof child.type === 'function' && !child.props.size) {
        return React.cloneElement(child, {rule, getValue, setError: this.setError, id: idFor});
      }
      return child;
    });
  }

  render() {
    const {errorText} = this.state;

    const {label, idFor, children, labelWidth, disabled, border} = this.props;
    return (
      <div className={classnames('form-item', {'bor-bottom1px': border}, {disabled})}>
        {label ? (
          <div className="item-control flex">
            <label htmlFor={idFor} className="item-label" style={{width: labelWidth}}>{label}</label>
            <div className="flexBox item-wrap">
              {this.renderChildren(children)}
              {errorText ? (<p className="item-info flex"><i className="icon icon-error-info"></i><span className="flexBox">{errorText}</span></p>) : null}
            </div>
          </div>
        ) : this.renderChildren(children)}
      </div>
    )
  }
}

FormItem.propTypes = {
  label: PropTypes.string,
  idFor: PropTypes.string,
  children: PropTypes.node,
  rule: PropTypes.array,
  getValue: PropTypes.func,
  labelWidth: PropTypes.string,
  disabled: PropTypes.bool,
  border: PropTypes.bool
};

FormItem.defaultProps = {
  disabled: false,
  border: true
}

export default FormItem;

/**
 * rule [{pattern: /\d+/, message: ''}, {required: true, message: ''}]
 */

