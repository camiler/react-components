### RadioGroup

#### how to use
```
<RadioGroup radios={[{text: 'A', id: 'A'}, {text: 'B', id: 'B'}]} style={{marginRight: '0.1rem'}} />
<RadioGroup radios={[{text: 'A', id: 'A'}, {text: 'B', id: 'B'}]} disabled checkedId="A"/>
```

#### props
* id: PropTypes.string  相当于表单中的name值
* checkedId: PropTypes.string  设置默认选中的值
* disabled: PropTypes.bool 禁止点击
* radios: PropTypes.array.isRequired  radio组列表，形如：[{text: 'A', id: 'A'}, {text: 'B', id: 'B'}]
* style: PropTypes.object  外层样式
* cls: PropTypes.string 外层class
* getValue: PropTypes.func  获取选中的值，返回的是一个{[id]: value}对象

### Radio

#### how to use
```
<Radio text={text} id={id} checked={String(checkedId) === String(item.id)}
       disabled={disabled} onChange={} />
```

#### props
* checked: PropTypes.bool  是否选中
* disabled: PropTypes.bool  是否禁止点击
* text: PropTypes.string  radio后的文本
* id: PropTypes.string.isRequired  key 唯一标志 
* onChange: PropTypes.func  radio值变化时回调

