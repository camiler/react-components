/* eslint-disable no-alert */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './select.less';
class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '',
      gray: true,
    };
    this.requiredObj = null;
  }

  componentWillMount() {
    const {rule, selectedValue, placeholder} = this.props;
    this.setState({
      selectedValue: selectedValue || placeholder,
    });
    (rule || []).forEach((ruleItem) => {
      if (ruleItem.required) {
        this.requiredObj = ruleItem;
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const nextSelectedValue = nextProps.selectedValue;
    this.setState({
      selectedValue: nextSelectedValue || this.props.placeholder,
      gray: nextSelectedValue === this.props.placeholder || nextSelectedValue === ''
    })
  }

  renderList = (list) => {
    if (!list || list.size === 0) {
      return null;
    }
    const {optName, optKey} = this.props;
    return list.map((item) => {
      return (
        <option key={item[optKey]} value={item[optKey]}>
          {item[optName]}
        </option>
      );
    });
  }

  selectedHandler = (e) => {
    const {placeholder} = this.props;
    const selectedValue = e.target.value;
    if (selectedValue === placeholder || selectedValue === '') {
      this.setState({
        gray: true
      })
    } else {
      this.props.getValue({[this.props.id]: selectedValue});
      const required = this.requiredObj && this.requiredObj.required || null;
      if (required && !selectedValue.trim()) {
        this.props.setError(this.requiredObj.message)
      } else {
        this.props.setError('');
      }
      this.setState({
        selectedValue,
        gray: false
      });
    }
  }

  render() {
    const {selectedValue, gray} = this.state;
    const { cls, list, placeholder, id} = this.props;
    return (
      <div className={classnames('form-select', cls)}>
        <select name={id} id={id}
                className={classnames({gray})}
                onChange={this.selectedHandler}
                value={selectedValue}
        >
          <option value={placeholder} disabled>{placeholder}</option>
          {this.renderList(list)}
        </select>
      </div>
    )
  }
}

Select.propTypes = {
  id: PropTypes.string,
  selectedValue: PropTypes.string,
  placeholder: PropTypes.string,
  list: PropTypes.array,
  cls: PropTypes.string,
  optName: PropTypes.string,
  optKey: PropTypes.string,
  rule: PropTypes.array,
  getValue: PropTypes.func,
  setError: PropTypes.func,
};

export default Select;


