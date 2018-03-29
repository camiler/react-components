import React, { Component } from 'react';
import {Button, AutoComplete, Toast, Loading, Modal} from './components';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toast: false,
      loading: false,
    }
  }
  onSelect = (obj) => {
    console.log(obj);
    //这里 获取到 类似{id: 2, name: "张爱玲-红玫瑰"} 的选中对象后 做其他逻辑： 如跳转页面等
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

  render() {
    const {toast, loading, modal} = this.state;
    return (
      <div className="App">
        <AutoComplete list={[{id: 1, name: '东野圭吾-解忧杂货店'}, {id: 2, name: '张爱玲-红玫瑰'}, {id: 3, name: '东野圭吾-白夜行'}, {id: 4, name: '托尔斯泰-悲惨世界'}]}
                      optKey="id"
                      optName="name"
                      selectValue="3"
                      onSelect={this.onSelect}
                      emptyFunc={this.emptyFunc}
                      inputKey="bookName"
        />
        <Button cls="large default" style={{margin: '.2rem auto'}} text="show toast (large default)" onClick={this.showToast}/>
        <Button cls="large pressed" style={{margin: '.2rem auto'}} text="show loading (large pressed)" onClick={this.showLoading}/>
        <Button cls="large" disabled style={{margin: '.2rem auto'}} text="large disabled"/>

        <Button cls="default" fixed text="show modal (fixed button)" onClick={this.showModal}/>
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