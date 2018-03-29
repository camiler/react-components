/**
 * selectbox
 */
/* eslint-disable*/
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './selectBox.less';
import {censusRecord} from '../../utils/perfect';

class SelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      checked: false,
    }
  }

  componentWillMount() {
    const {initValue} = this.props;
    if (initValue) {
      this.setState({
        selectedValue: initValue || ''
      })
    }
  }

  componentDidMount() {
    const {valueArray, initValue} = this.props;
    if(initValue) {
      for(const index in valueArray) {
        if(valueArray[index].name == initValue || valueArray[index].item == initValue){
          this.setState({
            bgColor: index,
          })
          this.props.getContent({
            name: initValue, 
            id: valueArray[index].id || index
          })
          break;
        }
      }
    }
  }

  showSelectModal = () => {
    const {valueArray, initValue} = this.props;
    this.setState({showModal: true})
    if (initValue) {
      for(const index in valueArray) {
        if(valueArray[index].name == initValue || valueArray[index].item == initValue){
          this.setState({
            bgColor: index,
          })
          break;
        }
      }
    }
  }

  closeSelectModal = () => {
    const localHref = location.href;
    this.setState({showModal: false})
    if (localHref.indexOf('lending-info') > 0) {
      censusRecord('closename', 1, false);
    } 
  }

  radioCheck = (index, e) => {
      const {bgColor, showModal, selectedValue} = this.state;
      const nodeContent = e.currentTarget.childNodes[0].innerHTML;
      const nodeId =  e.currentTarget.getAttribute('id');
      this.props.getContent({
        name: nodeContent, 
        id: nodeId
      });
      this.setState({
        bgColor: index,
        showModal: false,
        selectedValue: nodeContent,
      });
  }

  blurThis = () => {
    this.inputRef.blur();
  }
  input = (ref) => {
     if (!this.inputRef) {
       this.inputRef = ref
     }
   }
  render() {
    const {placeholder, selectTitle, bottomButton, initValue, valueArray, emptyContent} = this.props;
    const {showModal, checked, steArray, bgColor, selectedValue} = this.state;
    const toggleShow = showModal ? 'select-show' : null;
    const haveList = valueArray.length > 0 ? true : false;
    return (
      <div className='lease-select-box'>
        <input 
          readOnly
          value={selectedValue || initValue || ''}
          placeholder={placeholder}
          onFocus={this.blurThis}
          ref={this.input}
          onClick={this.showSelectModal}
          className='form-input has-arrow-down'
        />
        <section className={classnames(`${toggleShow} select-box-modal`)}>
          <div className='modal-inner'></div>
          <div className='modal-outter'>
            <p className='select-title'>{selectTitle}</p>
            <div className='select-content-box'>
              {haveList  ?
                (valueArray.map((item, index) => {
                  return (
                    <div className="radio-animation flex boxAlignStart" id={item.id || index} key={index} onClick={this.radioCheck.bind(this, index)}>
                      <label className='radio-label'>{item.name}</label>
                      <label className={(bgColor == index) ? 'outer checked' : 'outer'}>
                        <span className="inner"></span>
                      </label>
                    </div>
                  )
                }))
                :
                (<div className='have-no-content'>{emptyContent}</div>)
              }
            </div>
            <button className='select-button' onClick={this.closeSelectModal}>{bottomButton}</button>
          </div>
        </section>
      </div>
    )
  }
}

SelectBox.propTypes = {
  selectedValue: PropTypes.string,
  placeholder: PropTypes.string,
  selectTitle: PropTypes.string,
  bottomButton: PropTypes.string,
  initValue: PropTypes.string,
  valueArray: PropTypes.array,
  emptyContent: PropTypes.string,
}

export default SelectBox
