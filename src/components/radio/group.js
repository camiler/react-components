import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Radio from './index';

import './radio.less';

class RadioGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checkedId: null
    }
  }

  componentWillMount() {
    this.setState({
      checkedId: this.props.checkedId
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      checkedId: nextProps.checkedId,
    })
  }

  singleRadioChange = (checkedId) => {
    this.setState({
      checkedId
    });
    const {getValue, id} = this.props;
    if (getValue) getValue({[id]: checkedId});
  }

  render() {
    const {checkedId} = this.state;
    const {radios, disabled, style, cls} = this.props;

    return (
      <div style={style} className={cls}>
        {radios && radios.length > 0 ? (
          radios.map(item => {
            return (<Radio key={item.id} text={item.text} id={item.id} checked={String(checkedId) === String(item.id)}
                          disabled={disabled} onChange={this.singleRadioChange}/>)
          })
        ) : null}
      </div>
    )
  }
}

RadioGroup.propTypes = {
  id: PropTypes.string,
  checkedId: PropTypes.string,
  disabled: PropTypes.bool,
  radios: PropTypes.array.isRequired,
  style: PropTypes.object,
  cls: PropTypes.string,
  getValue: PropTypes.func,
};

RadioGroup.defaultProps = {
  id: 'radioGroup',
  checkedId: '',
  disabled: false,
  style: {},
  cls: '',
  getValue: (obj) => {
    console.log(obj);
  }
}

export default RadioGroup;
