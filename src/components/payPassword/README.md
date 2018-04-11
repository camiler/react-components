### PayPassword

#### how to use
```
<PayPassword type="sm" inputId="sm-pay"/>
```
#### props
* style: PropTypes.object  外层样式
* cls: PropTypes.string  样式类，用于重写覆盖
* type: PropTypes.string  默认的密码框大小类型 'big' or 'sm', default: 'big'
* inputId: PropTypes.string  输入框ID，唯一
* inputChange: PropTypes.func  输入过程中的回调，输入值作为其参数
* inputEnd: PropTypes.func  输入6位密码之后的值获取回调方法