<template>
    <div id="shop-item">
        <check-button :checked="itemInfo.checked" @click.native="btnClick" ></check-button>
        <div class="item-img">
            <img :src="itemInfo.image" alt="商品图片">
        </div>
        <div class="item-info">
            <h4 class="item-title">{{itemInfo.title}}</h4>
            <p class="item-desc">商品描述: {{itemInfo.desc}}</p>
            <div class="info-bottom">
                <span class="item-price left">￥{{itemInfo.price}}</span>
                <span class="item-count right">x{{itemInfo.count}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import CheckButton from "./CheckButton"
    export default{
        name:'MarketListItem',
        props:{
            itemInfo:{
                type:Object,
                default(){
                    return {}
                }
            },
        },
        components:{
            CheckButton
        },
        methods:{
            btnClick(){     //修改vuex中 products 数组中指定商品(iid)的数据
                this.$store.commit('updateCheck',this.itemInfo.iid)
              
            }
        }
    }
</script>

<style scoped>
    #shop-item {
        width: 100%;
        display: flex;
        font-size: 0;
        padding: 5px;
        border-bottom:1px solid #ccc;
    }

    .item-selector {
        width: 14%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .item-title, .item-desc {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .item-img {
        padding: 5px;

    }

    .item-img img{
        width: 80px;
        height: 100px;
        display: block;
        border-radius: 5px;
    }



    .item-info {
        font-size: 17px;
        color: #333;
        padding: 5px 10px;
        position: relative;
        overflow: hidden;
    }

    .item-info .item-desc {
        font-size: 14px;
        color: #666;
        margin-top: 15px;
    }

    .left {
         float: left;
    }

   .right {
       float: right;
   }

    .info-bottom {
        margin-top: 10px;
        position: absolute;
        bottom: 10px;
        left: 10px;
        right: 10px;
    }

    .info-bottom .item-price {
        color: orange;
    }

    
</style>