
import Toast from './Toast'
//把Toast组件注册到Vue的原型上 让每个组件都可以使用Toast上的属性和方法
// console.log(Toast)

var ToastPlugin = { 
    install(Vue){
        //生成组件构造器
        const ToastConstructor = Vue.extend(Toast)
        // console.log(ToastConstructor)
        //生成组件的实例化对象
        const toast = new ToastConstructor()
        // console.log(toast)
        //把组件的实例化对象和一个dom做关联
        toast.$mount(document.createElement('div'))
        //把Toast组件的根节点挂载在body上
        document.body.appendChild(toast.$el)
        Vue.prototype.$toast = toast
    }
}

export default ToastPlugin