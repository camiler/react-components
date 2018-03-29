import React, {Component} from 'react';
import ReactDom, { render } from 'react-dom'
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './select.less';
class SelectItem extends Component {
  /**
   * 该组件不用，是通过样式实现IOS原生下拉框，还未完成。直接用Select组件
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
      value: ''
    };
    this.requiredObj = null;
    this.optsContainer = null;
  }

  componentWillMount() {
    const {rule} = this.props;
    (rule || []).forEach((ruleItem) => {
      if (ruleItem.required) {
        this.requiredObj = ruleItem;
      }
    });
  }

  componentDidMount() {
    window.addEventListener('click', this.hideSelect, false);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.hideSelect, false);
  }

  renderSelectOptions = (list) => {
    if (document.getElementById('selectOpts')) {
      return;
    }
    this.optsContainer = document.createElement('div');
    this.optsContainer.setAttribute('id', 'selectOpts');
    this.optsContainer.setAttribute('class', 'select-opts-mask');
    document.body.appendChild(this.optsContainer);
    render(
      <ul className="select-opts">
        {this.renderList(list)}
      </ul>, this.optsContainer
    )
  }

  openSelectHandler = (e) => {
    e.stopPropagation();
    this.renderSelectOptions(this.props.list);
  }

  hideSelect = () => {
    if (document.getElementById('selectOpts')) {
      ReactDom.unmountComponentAtNode(this.optsContainer);
      document.body.removeChild(this.optsContainer);
      this.optsContainer = null;
    }
  }

  renderList = (list) => {
    if (!list || list.size === 0) {
      return null;
    } 
    return list.map((item) => {
      return (
        <li key={item} onClick={this.selectedHandler(item)}>
          <p className="select-li-text">{item}</p>
        </li>
      );
    });
    
  }

  selectedHandler = (value) => {
    return () => {
      this.props.getValue({[this.props.id]: value});
      const required = this.requiredObj && this.requiredObj.required || null;
      if (required && !value.trim()) {
        this.props.setError(this.requiredObj.message)
      }
      this.setState({
        value,
      });
      this.hideSelect();
    }
  }

  render() {
    const {value, hide} = this.state;
    const {optName, optKey, cls, list, placeholder, initValue} = this.props;
    const hasList = list && list.length > 0;
    const arrowDirection = hide ? 'bottom' : 'top';
    return (
      <div className={classnames('form-select', cls)} onClick={this.openSelectHandler}>
        {hasList ? (
          <div className={classnames(`ui-arrow arrow-${arrowDirection}`)}>
            <span></span><i></i>
          </div>
        ) : null}
        <p className={classnames('select-value', {color9: (placeholder || initValue) && !value})}>{value || initValue || placeholder}</p>
      </div>
    )
  }
}

SelectItem.propTypes = {
  id: PropTypes.string,
  initValue: PropTypes.string,
  placeholder: PropTypes.string,
  list: PropTypes.array,
  cls: PropTypes.string,
  optName: PropTypes.string,
  optKey: PropTypes.string,
  rule: PropTypes.array,
  getValue: PropTypes.func,
  setError: PropTypes.func,
};

export default SelectItem;


