### CursorInput

#### how to use
```
<CursorInput style={{margin: '.2rem'}}/>
```
#### props
* id: PropTypes.string  唯一标志
* rule: PropTypes.array  验证规则
* setError: PropTypes.func  规则验证错误时回调
* cls: PropTypes.string  外层class，用于重写内部样式
* borderBottom: PropTypes.bool  是否有下边
* style: PropTypes.object  外层样式
* getValue: PropTypes.func  输入时获取值
* placeholder: PropTypes.string  默认提示