import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './toast.less';

class Toast extends Component {
  constructor(options) {
    super(options)
    this.state = {
    }
  }

  componentWillReceiveProps(nextProps) {
    const {show, scroll} = nextProps;
    if (!scroll) {
      if (show) {
        document.body.addEventListener('touchmove', this.documentMoveHandler, false);
        document.body.addEventListener('wheel', this.documentMoveHandler, false);
      } else {
        document.body.removeEventListener('touchmove', this.documentMoveHandler, false);
        document.body.removeEventListener('wheel', this.documentMoveHandler, false);
      }
    }
  }

  documentMoveHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
  }

  render() {
    const {msg, show} = this.props;
    if (show) {
      return (
        <div
          className="flex boxCenter fixedMask toast-panel"
        >
          {msg ? (
            <div className="toast-content">{msg}</div>
          ) : null}
        </div>
      )
    }
    return null;
  }
}

Toast.defaultProps = {
  msg: '弹出消息文本',
  show: false,
  scroll: false,
};

Toast.propTypes = {
  msg: PropTypes.string,
  show: PropTypes.bool,
  scroll: PropTypes.bool
};

export default Toast;
