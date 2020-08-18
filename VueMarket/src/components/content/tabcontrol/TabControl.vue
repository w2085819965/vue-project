<template>
    
    <ul class="tab-control"> 
        <li v-for="(item,index) in titles" :key="item.id" @click="handleClick(index)" :class="{active:currentIndex===index}">
            <span>{{item}}</span>
        </li>
    </ul>
</template>i

<script>
    export default{
        name:"TabControl",
        props:{
            titles:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        methods:{
            handleClick(index){
                // console.log(index)
                this.currentIndex = index
                
                //告诉父组件 点击了哪个li 子组件把数据传给父组件
                this.$emit("tabClick",index)
            }
        },
        data(){
            return{
                currentIndex:0
            }
        }
        
    }
</script>

<style scoped lang="less"> 
    
    .tab-control{
        position: relative;
        display: flex;
        text-align: center;
        line-height: 40px;
        background-color: #fff;
        li{
            flex: 1;
        }
        .active{
            span{
                padding: 5px;
                color: red;
                border-bottom: 3px solid red;
            }
        }
    }
</style>