### Modal

#### how to use
```
<Modal visible={modal}
       cancel={this.closeModal}
>
    { other elements }
</Modal>
```

#### props
* visible: PropTypes.bool.isRequired  是否显示
* cancel: PropTypes.func.isRequired  消失时回调，必须。这里通常是设置visible为false     
* title: PropTypes.string  标题
* content: PropTypes.node 内容元素
* confirm: PropTypes.func 确认时回调，回调完成后会调用消失回调
* cancelText: PropTypes.string  取消文字，默认："取消"
* confirmText: PropTypes.string 确认文字，默认："确认"     
* children: PropTypes.element  子节点元素，如有这个，content， title将完全被替代
* cls: PropTypes.string 样式class, 需要重置内部样式添加
* style: PropTypes.object 外层元素样式