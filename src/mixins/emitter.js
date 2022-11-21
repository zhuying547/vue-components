function broadcast(componentName, eventName, params) {
  this.$children.forEach((child) => {
    const name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}

export default {
  methods: {
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    },
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }

      if (parent) {
        console.log([eventName].concat(params));
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
  },
};
/**
 * 上级往下级广播
 *  铁定会用到递归：即函数本身调用自己，通过 apply 方法改变函数内的 this 指向来完成
 *
 * 1.什么时候结束递归 name === componentName 时结束，child.$emit.apply(child, [eventName].concat([params]) )
 *
 * 2. broadcast.apply(child, [componentName, eventName].concat(params))
 *
 * tips: params 如果是数组的话 [].concat([params]), 这样第二个参数就是数组 这里在 $on(eventName, (...args)=>{})来获取值
 *
 * forEach 如果循环项没有值，则不会进行循环处理
 *
 * dispatch 向上派发
 * 通过 while 语句找到 parent
 *
 * while(parent && (!name || name !== componentName)){
 *   parent = parent.$parent
 *
 *   if (parent) name = parent.$options.name
 * }
 */
