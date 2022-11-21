注意事项：如果都是在生命周期中进行 $emit 和 $on，那么需要注意子组件 mounted 后才触发父组件的 mounted
父：一直执行到 beforeMount 开始等待子：的 mounted 之后

问题：如何在 form-item 中获取 form 中的 model 呢？
通过在 form 组件中 provide,`this.form.model[this.prop]`

在 form 抛出 resetFields 和 validate 分别是调用所有缓存在 fields 中的项。

在 form-item 中做的事情有很多：

- validate 方法用于对其传入的 rules 进行校验
