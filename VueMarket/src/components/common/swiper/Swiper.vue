<!-- The ref attr used to find the swiper instance -->
<template>
<div class="swiper" :style="{paddingBottom}">
  <swiper :options="swiperOption" v-if="banner.length!==0">
    <!-- slides -->
    <swiper-slide v-for="item in banner"  :key="item.acm">
      <img :src="item" alt="">
      </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  data-swiper-autoplay="2000"  slot="pagination"></div>
  </swiper>

  
  </div>
  
</template>

<script>

  export default {
    name: 'CommonSwiper',
    props:{
        banner:{
            type:Array,
            default(){
                return []
            }
        },
        paddingBottom:{
          type:String,
        }
        
    },
    data() {
      return {
        swiperOption: {
            pagination: {
              el: '.swiper-pagination'
            },
            loop:true, //是否循环轮播
            autoplay: {
              delay: 2000,//1秒切换一次
            },
        }
      }
    },
  }



 
</script>

<style lang="less" scpode>
  .swiper{
    position: relative;
    overflow: hidden;
    height: 0;
    // padding-bottom: 80%;//此处的百分比 是相对width元素的width
  }

  .swiper img{
      width: 100%;
  }

  .swiper /deep/ .swiper-container{
    position: static;
  }
  /* 样式穿透 如果要在当前项目修改第三方库的样式           */ 
  .swiper /deep/ .swiper-pagination-bullet-active{
    background-color: red;
  }
</style>