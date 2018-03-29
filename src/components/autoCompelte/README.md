### AutoComplete

#### how to use
```
<AutoComplete list={[{id: 1, name: '东野圭吾-解忧杂货店'}, {id: 2, name: '张爱玲-红玫瑰'}, {id: 3, name: '东野圭吾-白夜行'}, {id: 4, name: '托尔斯泰-悲惨世界'}]}
              optKey="id"
              optName="name"
              selectValue="3"
              onSelect={this.onSelect}
              emptyFunc={this.emptyFunc}
              inputKey="bookName"
/>
```
#### props
* list: PropTypes.array.isRequired  列表
* optName: PropTypes.string.isRequired 选项中显示的文字对应的列表里面的key
* optKey: PropTypes.string.isRequired 选项中唯一标识key，通常是表单需要提交的数据
* onSelect: PropTypes.func.isRequired  选择之后的回调
* inputKey: PropTypes.string.isRequired 输入完成后 返回输入文字对应的key
* emptyFunc: PropTypes.func 点击完成时，输入为空的回调
* selectValue: PropTypes.string 默认选中的optKey值
* searchPlaceHolder: PropTypes.string  搜索框默认文字
* noMatchText: PropTypes.node  没有匹配项显示
* noListText: PropTypes.node  没有列表时显示
* needFinish: PropTypes.bool 是否需要完成按钮
* className: PropTypes.string 样式覆盖