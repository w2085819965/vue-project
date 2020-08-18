<template>
    <div class="good-list">
        <goods-list-item v-for="item in goods" :goods-info="item"  :key="item.id"> </goods-list-item>
    </div>
</template>

<script>
import GoodsListItem from "components/content/goodslist/GoodsListItem"
    export default {
        name:"GoodsList",
        props:{
            goods:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        components:{
            GoodsListItem
        }

    }
</script>

<style scoped lang="less">
    
    .good-list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>