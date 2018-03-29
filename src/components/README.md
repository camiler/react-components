### demo查看
http://localhost:9999/demo

### 下拉选择
```
<SelectItem 
  list={['beijing', 'chengdu', 'dalian']}  
  cls=""  //覆盖样式
/>
```

### 按钮
```
<Button cls="large default" style={{margin: '.2rem auto'}} text="large default"/>

<Button cls="large pressed" style={{margin: '.2rem auto'}} text="large pressed"/>

<Button cls="large disabled" disabled style={{margin: '.2rem auto'}} text="large disabled"/>

<Button cls="primary default fl" text="primary default"/>
<Button cls="primary pressed fl" text="primary pressed"/>
          
<Button fixed disabled />  //固定底部  不可点击
```

### 输入框
```
<Input placeholder="请输入申请金额" initialValue="2312" disabled/>
```

### 表单项
```
<FormItem label="申请金额："
          idFor="amount"
          getValue={this.getValue}
          rule={[{
            required: true, message: '请输入申请金额'
          }, {
            pattern: /\d+$/, message: '为数字'
          }]}
>
  {children}
</FormItem>
```

### 全局toast
```
<Toast msg={msg} show={show}/>
```

### 全局loading
```
<Loading show={loading} />
```