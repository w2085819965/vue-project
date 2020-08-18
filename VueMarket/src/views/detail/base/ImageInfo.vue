<template>
    <div v-if="Object.keys(imageInfo).length !== 0" class="goods-info">

        <div class="info-desc clear-fix">
            <i class="start"></i>
            <p class="desc">{{imageInfo.desc}}</p>
            <i class="end"></i>
        </div>
        <h4 class="info-key">{{imageInfo.detailImage[0].key}}</h4>
        <div class="info-list">
            <img v-for="(item,index) in images"
            @load="imgLoad"
            :src="item" :key="index" alt="">
        </div>
    </div>
</template>
<script>
    
    export default{
        name:"DetailImageInfo",
        props:{
            imageInfo:{
                type:Object,
                default(){
                    return{}
                }
            }
        },
        data(){
            return {
                count:0
            }
        },
        computed:{
            images(){
                return this.imageInfo.detailImage[0].list
            }
        },
        methods:{
            imgLoad(){  //等到所有的图片加载完成之后 告诉detail组件 获取滚动的具体位置
                this.count++
                if(this.count===this.images.length){
                    this.$emit("imgLoad",this.count)
                }
                // console.log("imgLoad",,this.count)
            }
        }
        
    }
</script>
<style scoped>
    
    .goods-info {
        padding: 20px 0;
        border-bottom: 5px solid #f2f5f8;
    }

    .info-desc {
        padding: 0 15px;
    }

    .info-desc .start ,.info-desc .end {
        position: relative;
        width: 90px;
        height: 1px;
        background-color: #a3a3a5;
        
    }

    .info-desc .start {
        float: left;
    }

    .info-desc .end{
        float: right;
    }

    .info-desc .start::before, .info-desc .end::after{
        content: '';
        position: absolute;
        width: 5px;
        height: 5px;
        background-color:#333;
        bottom: 0;
    }

    .info-desc .end::after{
        right: 0;
    }

    .info-desc .desc{
        padding: 15px 0;
        font-size: 14px;
    }

    .info-key{
        margin: 10px 0 10px 15px;
        color: #333;
        font-size: 15px;
    }

    .info-list img{
        width: 100%;
    }
    
</style>