import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './checkbox.less';

class CheckBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
  }

  componentWillMount() {
    this.setState({
      checked: this.props.checked
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      checked: nextProps.checked,
    })
  }

  boxCheck = () => {
    const {disabled, getValue, id} = this.props;
    if (!disabled) {
      this.setState(({checked}) => ({
        checked: !checked
      }), () => {
        if (getValue) getValue({[id]: this.state.checked});
      });
    }
  }

  render() {
    const {checked} = this.state;
    const {disabled, text, style} = this.props;

    return (
      <div className="checkBox-wrap flex boxAlignStart" style={style}>
        <label className={classnames('outer', {checked, disabled})} onClick={this.boxCheck}>
          <span className="inner"></span>
        </label>
        <div className="text flexBox">{text}</div>
      </div>
    )
  }
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
