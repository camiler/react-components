import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './toast.less';

class Toast extends Component {
  constructor(options) {
    super(options)
    this.state = {
    }
    this.preventDocumentMove = false
  }
  componentDidMount() {
    document.addEventListener('touchmove', this.documentMoveHandler)
  }
  componentWillUnmount() {
    document.removeEventListener('touchmove', this.documentMoveHandler)

  }
  documentMoveHandler = (evt) => {
    if (this.preventDocumentMove) {
      evt.preventDefault()
    }
  }
  toastTouchStartHandler = (evt) => {
    this.preventDocumentMove = true
  }
  toastTouchMoveHandler = (evt) => {
    this.preventDocumentMove = true
  }
  toastTouchEndHandler = (evt) => {
    this.preventDocumentMove = false
  }
  toastTouchCancelHandler = (evt) => {
    this.preventDocumentMove = false
  }
  render() {
    const {msg, show} = this.props;
    if (show) {
      return (
        <div
          className="flex boxCenter fixedMask toast-panel"
          onTouchStart={this.toastTouchStartHandler}
          onTouchMove={this.toastTouchMoveHandler}
          onTouchEnd={this.toastTouchEndHandler}
          onTouchCancel={this.toastTouchCancelHandler}
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
  show: false
};

Toast.propTypes = {
  msg: PropTypes.string,
  show: PropTypes.bool
};

export default Toast;
