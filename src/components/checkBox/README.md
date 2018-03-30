### CheckBox

#### how to use
```
<CheckBox disabled text="禁止选中" style={{marginBottom: '.2rem'}}/>
<CheckBox id="agreement" text={<a href="http://www.baidu.com">百度</a>} />
```
#### props
* checked: PropTypes.bool   是否选中
* disabled: PropTypes.bool  是否禁止修改
* text: PropTypes.node  checkbox后面的元素节点
* id: PropTypes.string  唯一标志 相当于表单项的name
* getValue: PropTypes.func  选中后获得值，类似：{name: true}
* style: PropTypes.object  外层样式