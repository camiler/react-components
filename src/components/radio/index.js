import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './radio.less';

class Radio extends PureComponent {
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

  checkRadio = () => {
    const {disabled, onChange, id} = this.props;
    if (!disabled) {
      this.setState({
        checked: true
      });
      if (onChange) onChange(id);
    }
  }

  render() {
    const {checked} = this.state;
    const {disabled, text} = this.props;

    return (
      <div className="radio-wrap" onClick={this.checkRadio}>
        <span className={classnames('outer', {checked, disabled})}>
          <span className="inner"></span>
        </span>
        <span className="text">{text}</span>
      </div>
    )
  }
}

Radio.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  id: PropTypes.string.isRequired, //key 唯一标志 也可以是value
  onChange: PropTypes.func,
};

export default Radio;
