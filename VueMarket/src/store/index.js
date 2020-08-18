import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store =  new Vuex.Store({
    state:{
        products: JSON.parse(localStorage.getItem('products'))||[]     //存储所有的商品
    },
    mutations:{         //定义修改store数据的方法
        addMarket(state,payload){
            // console.log(payload)
            const product = state.products.find(item=>item.iid===payload.iid)
        
            if(product){
                product.count++
            }else{
                state.products.push({
                    ...payload,
                    count:1,
                    checked:true
                })


                // //Object 中的assign属性作用 合并对象
                // state.products.push(Object.assign({count:1},payload))
            }
        },
        updateCheck(state,payload){  ///更新check按钮的状态
            // console.log(payload)
            const product = state.products.find(item=>item.iid===payload)

            product.checked = !product.checked
        },
        isSelectAll(state,payload){
            state.products.forEach(item=>item.checked=payload);
        },
       
        
    },
    actions:{

    },
    getters:{
        count(state){   //获取添加的某类商品的数量
            return function(iid){
                const product = state.products.find(item=>item.iid===iid)
                return product.count
            }
        },
        productsLength(state){
            return state.products.length
        },
        isCheckAll(state){   //全选按钮是否选中
            // console.log(state.products.every(item=>item.checked))
            return state.products.every(item=>item.checked)

        },
        SelectProductsLength(state){
            // console.log(state.products.filter(item=>item.checked).length)
            return state.products.filter(item=>item.checked).length
        },
        total(state){
            return state.products.reduce((pre,next)=>{
                return pre+(next.checked?next.count*next.price:0)
            },0)
        }
    },
})

//监听mutations 里面方法的执行 一旦方法执行了 state数据就一定改变了
store.subscribe(function (mutations,state){
    // console.log(arguments)
    //本地存储
    localStorage.setItem('products',JSON.stringify(state.products))
    // console.log(JSON.parse(localStorage.getItem('products')))
})

export default store



