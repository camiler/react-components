import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './loading.less';

class Loading extends Component{

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
    const {show} = this.props;
    if (show) {
      return (
        <div
          className="flex loading-wrap fixedMask boxCenter"
        >
          <div className="loading"></div>
        </div>
      )
    }
    return null;
  }

}

Loading.propTypes = {
  show: PropTypes.bool,
  scroll: PropTypes.bool,
};

Loading.defaultProps = {
  show: false,
  scroll: false
}

export default Loading;
