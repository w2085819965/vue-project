<template>
    <div class="base-info" v-if="Object.keys(goodsInfo).length">
        <h3 class="info-title">{{goodsInfo.title}}</h3>
        <div class="info-price">
            <span class="n-price">{{goodsInfo.newPrise}}</span>
            <span class="o-price">{{goodsInfo.oldPrice}}</span>
            <span class="discount">{{goodsInfo.discount}}</span>
        </div>
        <div class="info-other">
            <span>{{goodsInfo.columns[0]}}</span>
            <span>{{goodsInfo.columns[1]}}</span>
            <span>{{goodsInfo.services[goodsInfo.services.length-1].name}}</span>
        </div>
        <div class="info-service">
            <span class="info-service-item" v-for="index in goodsInfo.services.length-1" :key="index">
                <img :src="goodsInfo.services[index].icon" >
                <span>{{goodsInfo.services[index-1].name}}</span>
            </span>
            

        </div>
    </div>
</template>

<script>
    
    export default{
        name:"GoodsInfo",
        props:{
            goodsInfo:{
                type:Object,
                default(){
                    return {}
                }
            }
        }
    }
</script>

<style scoped>
    .base-info{
        margin-top: 15px;
        padding: 0 8px;
        color: #999;
        border-bottom: 5px solid #f2f5f8;
    }
    .info-title{
        color: #222;
    }

    .info-price{
        margin-top: 10px;
    }

    .info-price .n-price{
        font-size:24px;
        color: pink;
    }
    .info-price .o-price{
        font-size: 13px;
        margin-left: 5px;
        text-decoration: line-through;
    }
    .info-price .discount{
        font-size: 12px;
        padding: 2px 5px;
        color: #fff;
        background:red;
        border-radius: 5px;
    }
    .info-other{
        display: flex;
        margin-top:15px;
        line-height: 30px;
        justify-content:space-between;
    }
    .info-other span{
        font-size: 14px;
    }
    .info-service{
         display: flex;
         justify-content: space-between;
         line-height: 60px;
    }
    .info-service span{
        font-size: 14px;
        color:#000;
    }
    .info-service img{
        width: 14px;
    }
</style>