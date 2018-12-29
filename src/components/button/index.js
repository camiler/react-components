import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './button.less';

const Btn = (props) => {
  const {cls, fixed, text, disabled, href, style, onClick} = props;
  const clickHandler = (event) => {
    if (!href && !disabled) {
      onClick(event);
    }
  };
  return React.createElement(href ? 'a' : 'button', {
    href,
    style,
    className: classnames('btn', cls, {'btn-bottom-fixed': fixed, disabled}),
    disabled,
    onClick: onClick ? clickHandler : null,
  }, text);
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
