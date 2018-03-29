### Button

#### how to use
```
<Button cls="large default" style={{margin: '.2rem auto'}} text="show toast (large default)" onClick={this.showToast}/>
<Button cls="large pressed" style={{margin: '.2rem auto'}} text="show loading (large pressed)" onClick={this.showLoading}/>
<Button cls="large disabled" disabled style={{margin: '.2rem auto'}} text="large disabled"/>
<Button cls="default" fixed text="show modal (fixed button)" onClick={this.showModal}/>
```

#### props
* href: PropTypes.string  链接，如有链接，将会是`<a href=""></a>`的形式
* cls: PropTypes.string  样式 默认样式有 `large/primary default/pressed/red`
* fixed: PropTypes.bool 是否固定在底部
* text: PropTypes.string 按钮文字
* disabled: PropTypes.bool 是否不可点击，若不可点击，样式会自动加上disabled
* onClick: PropTypes.func 点击事件
* style: PropTypes.object 其他外层样式