### Input 受控 

结合[FormItem](https://github.com/camiler/react-components/tree/master/src/components/formItem)一起用

#### how to use
```
<Input placeholder="请输入" type="tel" maxLength={6} initialValue="213222"}/>

```
#### props
* rule: PropTypes.array  校验规则
* getValue: PropTypes.func  获取输入值
* setError: PropTypes.func  错误处理
* cls: PropTypes.string  样式类
* onBlur: PropTypes.func  失去焦点回调
* onFocus: PropTypes.func  获取焦点回调
* initialValue: PropTypes.string  初始值
* 其他input自带非事件属性

note: 如果结合formItem，rule, getValue, setError会由formItem传递下去