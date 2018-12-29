import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './modal.less';

const Modal = (props) => {
  const [visible, setVisible] = useState(false);
  const onConfirm = () => {
    if (props.confirm) {
      props.confirm();
    }
  }

  const onCancel = () => {
    if (props.cancel)  props.cancel();
    setVisible(false);
  }

  useEffect(() => {
    setVisible(props.visible)
  }, [props.visible])

  if (visible) {
    return (
      <div className={classnames('modal-wrap-mask', props.cls)} style={props.style}>
        <div className={classnames('modal-wrap modal-ani')}>
          {props.children ? props.children : (
            <div>
              {props.title ? (<p className="title">{props.title}</p>) : null}
              {props.content ? (
                <div className="content">{props.content}</div>
              ) : null}
            </div>
          )}
          {props.cancelText || props.confirmText ? (
            <div className="footer">
              {props.cancelText ? (
                <button className="modal-btn cancel" onClick={onCancel}>{props.cancelText}</button>) : null}
              {props.confirmText ? (
                <button className="modal-btn confirm" onClick={onConfirm}>{props.confirmText}</button>) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
  return null;
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
  cancelText: '取消',
}

export default Modal;
