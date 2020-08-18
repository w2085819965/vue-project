<template>
    <div class="category-left-nav">
        <ul class="menu-list">
            <li 
                v-for="(item ,index) in categorys" 
                @click="itemclick(index)"
                :class="{active:currentIndex===index}"
                :key="item.key" 
                class="menu-list-item">{{item.title}}</li>
        </ul>
    </div>
</template>

<script>
    export default{
        name:"LeftNav",
        props:{
            categorys:{
                type:Array,
                default(){
                    return []
                },
            }
        },
        data(){
            return {
                currentIndex:0  //初始的时候 索引0的li被选中
            }
        },
        methods:{
            itemclick(index){
                this.currentIndex = index
                this.$emit('itemclick',index)
                
            }
        }
    }
</script>

<style lang='less' scoped>
    @import '~assets/css/varible.less';

    .category-left-nav{
        height: 100%;
        width: 100%;
        box-sizing: border-box;
    }



    .menu-list-item{
        background-color: #f6f6f6;
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 14px;
    }

    .menu-list-item.active{
        font-weight: 700;
        color: @heightTextColor;
        background-color: #fff;
        border-left: 3px solid  @heightTextColor;
    }

</style>