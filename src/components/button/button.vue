<script>
import { h } from 'vue'
const prefixCls = 'ivu-btn'
export default {
  name: 'Button',
  // 声明渲染函数
  render() {
    return h('button', { id: 'foo', class: 'bar' })
  }
}
</script>
