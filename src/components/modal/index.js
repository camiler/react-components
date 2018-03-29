import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './modal.less';

class Modal extends PureComponent {
  constructor(props) {
    super(props);
  }

  onCancel = () => {
    this.props.cancel();
  }

  onConfirm = () => {
    const {confirm, cancel} = this.props;
    if (confirm) confirm();
    cancel();
  }

  render() {
    const {title, content, cancelText, confirmText, children, cls, style, visible} = this.props;

    if (visible) {
      return (
        <div className={classnames('modal-wrap-mask', cls)} style={style}>
          <div className={classnames('modal-wrap modal-ani')}>
            {children ? children : (
              <div>
                {title ? (<p className="title">{title}</p>) : null}
                {content ? (
                  <div className="content">{content}</div>
                ) : null}
              </div>
            )}
            {cancelText || confirmText ? (
              <div className="footer">
                {cancelText ? (<button className="modal-btn cancel" onClick={this.onCancel}>{cancelText}</button>) : null}
                {confirmText ? (<button className="modal-btn confirm" onClick={this.onConfirm}>{confirmText}</button>) : null}
              </div>
            ) : null}
          </div>
        </div>
      );
    }
    return null;
  }
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  content: PropTypes.node,
  cancel: PropTypes.func.isRequired,
  confirm: PropTypes.func,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  children: PropTypes.element,
  cls: PropTypes.string,
  style: PropTypes.object,
};

Modal.defaultProps = {
  visible: false,
  title: "标题",
  content: "弹框内容",
  confirmText: '确认',
  cancelText: '取消'
}

export default Modal;
