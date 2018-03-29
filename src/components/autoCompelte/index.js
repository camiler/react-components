/**
 * 模糊搜索列表
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './autoComplete.less';
class AutoComplete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      searchList: [],
      searchValue: '',
      selectValue: '',
      searchAni: false,
    };
  }

  componentWillMount() {
    const {list, selectValue} = this.props;
    this.setState({list, selectValue});
    document.documentElement.style.background = '#FFF';
  }

  componentWillReceiveProps(nextProps) {
    const {list, selectValue} = nextProps;
    this.setState({list, selectValue});
  }

  componentWillUnmount() {
    document.documentElement.style.background = '#F7F8FA';
  }

  renderSelectOptions = () => {
    const {list, searchValue, selectValue} = this.state;
    const {optName, optKey, noMatchText, noListText} = this.props;

    const renderList = [];
    if (searchValue) {
      list.forEach((item) => {
        if (item[optName].indexOf(searchValue) > -1) {
          renderList.push(item);
        }
      })
      if (renderList.length > 0) {
        return renderList.map(item => {
          const text = item[optName];
          const idx = text.indexOf(searchValue);

          return (<li key={item[optKey]} onClick={this.selectedHandler(item)} className="bor-bottom1px flex verticalCenter">
            <p className="select-li-text flexBox">{text.substr(0, idx)}
              <span className="color-main">{searchValue}</span>
              {text.substr(idx + searchValue.length)}
            </p>
            {String(selectValue) === String(item[optKey]) ? <i className="icon icon-list-selected"></i> : null}
          </li>)
        });
      }
      return (<li>{noMatchText}</li>);
    }

    if (list) {
      return list.map((item) => {
        return (
          <li key={item[optKey]} onClick={this.selectedHandler(item)} className="bor-bottom1px flex verticalCenter">
            <p className="select-li-text flexBox">{item[optName]}</p>
            {String(selectValue) === String(item[optKey]) ? <i className="icon icon-list-selected"></i> : null}
          </li>
        );
      });
    }
    return <p className="center" style={{margin: '3rem auto'}}>{noListText}</p>
  }

  selectedHandler = (item) => {
    return () => {
      const {optKey, onSelect} = this.props;
      this.setState({
        selectValue: item[optKey]
      })

      if (onSelect) onSelect(item);
    }
  }

  searchInput = (e) => {
    const searchValue = e.target.value;
    this.setState({
      searchValue
    });
  }

  finishInput = () => {
    const {searchValue} = this.state;
    const {onSelect, inputKey, emptyFunc} = this.props;
    if (searchValue) {
      if (onSelect) {
        onSelect({[inputKey]: searchValue})
      }
    } else {
      if (emptyFunc) emptyFunc();
    }
  }

  inputFocus = () => {
    this.setState({
      searchAni: true
    })
  }

  inputBlur = () => {
    this.setState({
      searchAni: false
    })
  }

  clearSearch = () => {
    this.setState({
      searchValue: '',
    })
  }

  render() {
    const {searchPlaceHolder, className, needFinish} = this.props;
    const {searchValue, searchAni} = this.state;
    return (
      <div className={classnames('select-page-wrap', className)}>
        <div className="flex verticalCenter">
          <div className="flex search-wrap verticalCenter flexBox">
            <i className={classnames('icon icon-search', {searchAni})}></i>
            <input className="search-input flexBox" type="text" onChange={this.searchInput} onFocus={this.inputFocus}  onBlur={this.inputBlur}
                   placeholder={searchPlaceHolder}
                   value={searchValue}
            />
            <i className="icon icon-search-close" onClick={this.clearSearch}></i>
          </div>
          {needFinish && <span className="finish-btn" onClick={this.finishInput}>完成</span>}
        </div>
        <ul className="search-result">
          {this.renderSelectOptions()}
        </ul>
      </div>
    )
  }
}

AutoComplete.propTypes = {
  list: PropTypes.array.isRequired, //列表
  optName: PropTypes.string.isRequired, // 选项中显示的文字对应的列表里面的key
  optKey: PropTypes.string.isRequired, // 选项中唯一标识key，通常是表单需要提交的数据
  onSelect: PropTypes.func.isRequired, // 选择之后的回调
  inputKey: PropTypes.string.isRequired, // 输入完成后 返回输入文字对应的key
  emptyFunc: PropTypes.func, // 点击完成时，输入为空的回调
  selectValue: PropTypes.string, //默认选中的optKey值
  searchPlaceHolder: PropTypes.string, // 搜索框默认文字
  noMatchText: PropTypes.node, // 没有匹配项显示
  noListText: PropTypes.node, // 没有列表时显示
  needFinish: PropTypes.bool, // 是否需要完成按钮
  className: PropTypes.string, //样式覆盖
};

AutoComplete.defaultProps = {
  searchPlaceHolder: '搜索选择或输入名称点击完成',
  noMatchText: '暂无匹配结果，可直接输入并点击完成',
  noListText: <span>列表为空<br/>可输入后点击完成</span>,
  needFinish: true,
  className: '',
  selectValue: ''
}

export default AutoComplete;


