### Countdown

#### how to use
```
<Countdown needReset={needReset}  />
```
#### props
* needReset: PropTypes.bool  外层控制是否需要重置倒计时，比如在获取验证码接口错误的情况
* text: PropTypes.string  按钮显示文字 默认为：获取验证码
* beforeCount: PropTypes.func  在获取验证码倒计时之前的处理函数，比如这里校验手机号格式是否输入正确，并在函数内部返回true or false， 默认返回true
* style: PropTypes.object  按钮样式控制