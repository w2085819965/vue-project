<template>
    <div>
        <ul class="grid-view">
            <li class="content-item" 
            :style="styleObj"
            v-for="(item) in subcategory" :key="item.key">
                <img :src="item.image" alt="">
                <p>{{item.title}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:'GridView',
        props:{
             subcategory:{
                type:Array,
                default(){
                    return []
                },
            },
            cols:{
                type:Number,        //组件每一行会有几个li
                default:3
            }
        },
        computed:{
            styleObj(){
                return {
                    width:`${100/this.cols}%`
                }
            }
        }

    }
</script>

<style lang='less' scoped>
    .grid-view {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .content-item {
        text-align: center;
        font-size: 12px;
    }

    .content-item img{
        width: 80%;
    }

    .content-item p{
        margin-top: 15px;
        line-height: 20px;
        font-size: 14px;
    }
</style>