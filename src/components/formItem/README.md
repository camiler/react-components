### FormItem

#### how to use
```
<FormItem label="验证码"
          idFor="verifycode"
          horizontal={false}
          getValue={this.getValue}
          rule={[{
            pattern: /^\d{6}$/, message: '六位验证码'
          }]}
>
    <Input placeholder="请输入验证码" maxlength={6}/>
</FormItem>

<FormItem idFor="agree" border={false}
          getValue={this.getValue}
>
    <CheckBox style={{marginTop: '.3rem'}} />
</FormItem>

```
#### props
* label: PropTypes.string  表单项 名称 
* idFor: PropTypes.string  表单项id
* children: PropTypes.node  
* rule: PropTypes.array  校验规则
* getValue: PropTypes.func  输入过程中获取值
* labelWidth: PropTypes.string  名称样式宽度
* disabled: PropTypes.bool  是否禁止
* border: PropTypes.bool  是否有底部1px的 border
* horizontal: PropTypes.bool   label和输入框 是否水平排列，默认是水平的