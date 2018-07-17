import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './button.less';

class Btn extends PureComponent {
  clickHandler = (event) => {
    const {href, disabled, onClick} = this.props;
    if (!href && !disabled) {
      if (onClick) onClick(event);
    }
  }

  render() {
    const {cls, fixed, text, disabled, href, style, onClick} = this.props;
    const classes = classnames('btn', cls, {'btn-bottom-fixed': fixed, disabled});
    const element = href ? 'a' : 'button';

    const props = {
      href,
      style,
      className: classes,
      disabled,
      onClick: onClick ? this.clickHandler : null,
    }

    return React.createElement(element, props, text);
  }
}

Btn.defaultProps = {
  fixed: false,
  text: '按钮',
  disabled: false,
};

Btn.propTypes = {
  href: PropTypes.string,
  cls: PropTypes.string,
  fixed: PropTypes.bool,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default Btn;
