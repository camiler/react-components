import React, { Component } from 'react';
import {Button, AutoComplete, Toast, Loading, Modal, CheckBox, Countdown, CursorInput, ListItem, RadioGroup, TopBar, FormItem, Select, Input, PayPassword} from './components';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toast: false,
      loading: false,
      needReset: false,
      modal: false,
      selectId: 3,
      select: 'id1',
      score: ''
    }
  }
  onSelect = (obj) => {
    console.log(obj);
    //这里 获取到 类似{id: 2, name: "张爱玲-红玫瑰"} 的选中对象后 做其他逻辑： 如跳转页面等
    this.setState({selectId: obj.id});
    if (obj.id = 1) {
      this.setState({needReset: true});
    }
  }

  emptyFunc = () => {
    // 这里
    this.showToast();
  }

  showToast = () => {
    this.setState({
      toast: true
    }, () => {
      setTimeout(() => {
        this.setState({
          toast: false
        });
      }, 3000)
    })
  }

  showLoading = () => {
    this.setState({
      loading: true
    }, () => {
      setTimeout(() => {
        this.setState({
          loading: false
        });
      }, 3000)
    })
  }

  showModal = () => {
    this.setState({
      modal: true
    });
  }

  closeModal = () => {
    this.setState({
      modal: false
    });
  }

  getFormItemValue = (obj) => {
    console.log(obj);
    this.setState(obj)
  }

  render() {
    const {toast, loading, modal, needReset, selectId, select, score} = this.state;
    return (
      <div style={{paddingBottom: '1.5rem', paddingTop: '1rem'}}>
        <TopBar />
        <AutoComplete list={[{id: 1, name: '东野圭吾-解忧杂货店'}, {id: 2, name: '张爱玲-红玫瑰'}, {id: 3, name: '东野圭吾-白夜行'}, {id: 4, name: '托尔斯泰-悲惨世界'}]}
                      optKey="id"
                      optName="name"
                      selectValue={String(selectId)}
                      onSelect={this.onSelect}
                      emptyFunc={this.emptyFunc}
                      inputKey="bookName"
        />
        <Button cls="large default" style={{margin: '.2rem auto'}} text="show toast (large default)" onClick={this.showToast}/>
        <Button cls="large pressed" style={{margin: '.2rem auto'}} text="show loading (large pressed)" onClick={this.showLoading}/>
        <Button cls="large" disabled style={{margin: '.2rem auto'}} text="large disabled"/>
        <Button cls="default" fixed text="show modal (fixed button)" onClick={this.showModal}/>

        <PayPassword />

        <div style={{margin: '.2rem auto'}}>
          <PayPassword type="sm" inputId="sm-pay"/>
        </div>

        <div style={{margin: '.2rem auto', width: '6.7rem'}}>
          <CheckBox disabled text="禁止选中" style={{marginBottom: '.2rem'}}/>
          <CheckBox id="agreement" text={<a href="http://www.baidu.com">百度</a>} />
        </div>

        <Countdown needReset={needReset}  />
        <CursorInput style={{margin: '.2rem'}}/>

        <div style={{margin: '.4rem 0'}}>
          <ListItem label="标题文本" text="文本描述" next/>
          <ListItem label="标题文本" next/>
          <ListItem label="标题文本" text="文本描述"/>
          <ListItem label="双行标题文本" text="注解、内容文本注解、内容文本注解、内容文本" single={false}/>
          <ListItem withBorder={false} label="双行标题文本" text="注解、内容文本注解、内容文本注解、内容文本" single={false} next/>
        </div>

        <div style={{padding: '0 .4rem'}}>
          <RadioGroup radios={[{text: 'A', id: 'A'}, {text: 'B', id: 'B'}]}
                      style={{marginRight: '0.1rem'}} />
          <RadioGroup radios={[{text: 'A', id: 'A'}, {text: 'B', id: 'B'}]} disabled checkedId="A"/>
        </div>

        <FormItem label="分数"
                  idFor="score"
                  getValue={this.getFormItemValue}
                  rule={[{
                    range: [0, 100], message: `分数规则错误`,
                  }]}
        >
          <Input placeholder="请输入得分" type="tel" maxLength={3} initialValue={score}/>
        </FormItem>
        <FormItem label="选择项"
                  idFor="select"
                  getValue={this.getFormItemValue}
        >
          <Select list={[{id: "id1", text: '数学'}, {id: "id2", text: '语文'}]}
                  placeholder={'请选择'}
                  optName="text"
                  optKey="id"
                  border={false}
                  selectedValue={select}
          />
        </FormItem>

        <Toast msg="输入不能为空" show={toast} />
        <Loading show={loading}/>
        <Modal visible={modal}
               cancel={this.closeModal}
        >
        </Modal>
      </div>
    );
  }
}

export default App;