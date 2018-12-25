import React, { useState, useEffect, useRef } from 'react';
import {Button, AutoComplete, Toast, Loading, Modal, CheckBox, Countdown, CursorInput, ListItem, RadioGroup, TopBar, FormItem, Select, Input, PayPassword} from '../../components/';

const App = (props) => {
  const [state, setState] = useState({toast: false, loading: false, needReset: false, modal: false, selectId: 3, select: 'id1', score: ''});

  const timerRef = useRef();
  useEffect(() => {
    if (state.loading) {
      const timer = setTimeout(() => {
        updateState({loading: false});
      }, 2000);
      timerRef.current = timer;
      return () => {
        clearTimeout(timerRef.current)
      }
    }
    if (state.selectId === 1 && !state.needReset) {
      updateState({needReset: true})
    }
  });

  const updateState = (obj) => {
    setState(state => ({...state, ...obj}));
  }

  const handleSelect = (obj) => {
    updateState({selectId: obj.id});
  }

  const getFormItemValue = (obj) => {
    console.log(obj);
  }

  return (
    <div style={{paddingBottom: '1.5rem', paddingTop: '1rem'}}>
      <TopBar />
      <AutoComplete list={[{id: 1, name: '东野圭吾-解忧杂货店'}, {id: 2, name: '张爱玲-红玫瑰'}, {id: 3, name: '东野圭吾-白夜行'}, {id: 4, name: '托尔斯泰-悲惨世界'}]}
                    optKey="id"
                    optName="name"
                    selectValue={String(state.selectId)}
                    onSelect={handleSelect}
                    emptyFunc={() => setTrue('toast')}
                    inputKey="bookName"
      />

      <Countdown needReset={state.needReset}  />

      <Button cls="large default" style={{margin: '.2rem auto'}} text="show toast (large default)" onClick={() => updateState({toast: true})}/>
      <Button cls="large pressed" style={{margin: '.2rem auto'}} text="show loading (large pressed)" onClick={() =>  updateState({loading: true})}/>
      <Button cls="large" disabled style={{margin: '.2rem auto'}} text="large disabled"/>
      <Button cls="default" fixed text="show modal (fixed button)" onClick={() => updateState({modal: true})}/>

      <PayPassword />

      <div style={{margin: '.2rem auto'}}>
        <PayPassword type="sm" inputId="sm-pay"/>
      </div>

      <div style={{margin: '.2rem auto', width: '6.7rem'}}>
        <CheckBox disabled text="禁止选中" style={{marginBottom: '.2rem'}}/>
        <CheckBox id="agreement" text={<a href="http://www.baidu.com">百度</a>} />
      </div>
      <CursorInput style={{margin: '.4rem'}}/>
      <CursorInput style={{margin: '.4rem'}} placeholder="请输入" initialValue="3133213214312432323"/>

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
                getValue={getFormItemValue}
                rule={[{
                  range: [0, 100], message: `分数规则错误`,
                }]}
      >
        <Input placeholder="请输入得分" type="tel" maxLength={3} initialValue={state.score}/>
      </FormItem>
      <FormItem label="选择项"
                idFor="select"
                getValue={getFormItemValue}
      >
        <Select list={[{id: "id1", text: '数学'}, {id: "id2", text: '语文'}]}
                placeholder={'请选择'}
                optName="text"
                optKey="id"
                border={false}
                selectedValue={state.select}
        />
      </FormItem>

      <Toast msg="输入不能为空" show={state.toast} />
      <Loading show={state.loading}/>
      <Modal visible={state.modal}
             cancel={() => updateState({modal: false})}
      >
      </Modal>
    </div>
  );

}

export default App;