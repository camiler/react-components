import React from 'react';
import PropTypes from 'prop-types';
import './topbar.less';
import classnames from 'classnames';

const TopBar = (props) => {
  const {title, back, customText, customFunc, cls} = props;

  return (
    <div className={classnames('top-bar', cls)}>
      <span className="back-label"><i className="icon icon-16 icon-top-back" onClick={back}></i></span>
      <label className="title">{title}</label>
      <span className="custom-text" onClick={customFunc}>{customText}</span>
    </div>
  )
}

TopBar.defaultProps = {
  title: '标题',
  back: () => {console.log('back')}
};

TopBar.propTypes = {
  back: PropTypes.func,
  title: PropTypes.string,
  customText: PropTypes.string,
  customFunc: PropTypes.func,
  cls: PropTypes.string,
};

export default TopBar;
