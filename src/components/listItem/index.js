import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './list.less';

const ListItem = (props) => {
  const {label, next, itemClick, text, withBorder, single} = props;
  return (
    <div className={classnames('list-item', {'bor-bottom1px': withBorder}, single ? 'single' : 'double')} onClick={itemClick}>
      <div className="text-wrap">
        <label className="item-label">{label}</label>
        {text ? (<div className="item-text">{text}</div>) : null}
      </div>
      {next ? (<i className="icon icon-16 icon-list-arrow-next"></i>) : null}
    </div>
  )
};

ListItem.propTypes = {
  label: PropTypes.node,
  withBorder: PropTypes.bool,
  next: PropTypes.bool,
  text: PropTypes.string,
  itemClick: PropTypes.func,
  single: PropTypes.bool, //是否是单行文本
};

ListItem.defaultProps = {
  single: true,
  withBorder: true,
  next: false,
}

export default ListItem;
