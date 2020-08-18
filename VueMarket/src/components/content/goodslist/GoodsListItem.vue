<template>
    <div class="good-list-item" @click="handleClick">
        <!-- <img :src="goodsInfo.show.img" alt=""> -->
        <img v-lazy="showImage" alt="" @load="imgLoad">
        <div class="good-info">
            <p>{{goodsInfo.title}}</p>
            <span class="price">￥{{goodsInfo.price}}</span>
            <span class="collect">{{goodsInfo.cfav}}</span>
        </div>
    </div>
</template>

<script>
    export default{
        name:'GoodsListItem',
        props:{
            goodsInfo:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        methods:{
            handleClick(){
                const iid = this.goodsInfo.iid
                // console.log(this.goodsInfo)

               
                //如果是home组件的goodlListItem
                // if(iid !==undefined){this.$router.push(`/detail/${iid}`)}
                if(this.$route.path.includes('home')){this.$router.push(`/detail/${iid}`)}
                // this.$router.push({ path:'detail' , query: {iid}})
            },
            imgLoad(){
                // console.log('imgLoad')

               this.$bus.$emit('imgLoad')
            }
        },
        computed:{
            showImage(){
                return this.goodsInfo.image||this.goodsInfo.img||this.goodsInfo.show.img
            }
        }
    }
    
</script>

<style scoped>

    .good-list-item {
        position: relative;
        width: 46%;
        padding-bottom: 40px;
    }

    .good-list-item img {
        width: 100%;
        border-radius: 5px;
    }

    .good-info {
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
    }

    .good-info p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }

    .good-info .price {
        color: pink;
        margin-right:30px ;
    }
    
    .good-info .collect {
        position: relative;
    }

    .good-info .collect::before {
        content:'';
        position: absolute;
        left:-15px;
        top:-1px;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg") 0 2px/14px 14px;
    }

</style>