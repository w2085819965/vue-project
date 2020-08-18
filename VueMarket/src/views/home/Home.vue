<template>
  <div id="Home" ref='home'>
      <common-nav-bar>
        <template #left>
          
        </template>
        <template #middle>购物街</template>
        <template #right></template>
      </common-nav-bar>

      
     <tab-control 
           class="tabControl"
            ref="tabControl1"
            @tabClick="tabClick"
            v-show="isShowTabControl"
            :titles="Object.values(types)"></tab-control>


      <common-scroll 
        :pull-up-load="true"
        @loadMore="loadMore"
        @getPosition="getPosition"
        ref="scroll"
      >
          <common-swiper :padding-bottom="'52%'" :banner="banner"></common-swiper>
          <home-recommend :recommend="recommend"></home-recommend>
          <home-popular/>
           <tab-control 
            ref="tabControl2"
            @tabClick="tabClick"
            :titles="Object.values(types)"></tab-control>

           <goods-list :goods="goods[currentType].list "> 
             
           </goods-list>
           
          <!-- <div v-for="item in 100" :key="item.id">{{item}}</div> -->


          
      </common-scroll>

     <!-- <back-top @click.native ="backTop"></back-top> -->
     <back-top @backTop ="backTop" v-show="isShowBackTop"></back-top>
      
  </div>
</template>

<script>

// import BackTop from "components/content/backtop/backTop"
import {backTopMixin} from "utils/mixins"

import {reqHomeMultidata,reqHomeGoods} from 'api/home'
import HomeRecommend from "./base/Recommend"
import HomePopular from "./base/Popular"
import TabControl from "components/content/tabcontrol/TabControl"
import GoodsList from "components/content/goodslist/GoodsList"




export default {
  name: 'Home',
  data(){
    return {
      banner:[],        //轮播图数据
      recommend:[],         //推荐数据
      currentType:"pop",       //记录tab切换类型
      // typeList:["pop","new","sell"],    //父组件传递的数据类型
      isShowTabControl:false,             //初始不显示第一个TabControl组件
      // isShowBackTop:false,                //初始不显示返回顶部组件
      types:{
        pop:"流行",
        new:"新款",
        sell:"精选",
      },
      offsetTop:0,
      goods:{
        pop:{
          list:[],        //流行选项  对应的数据
          page:0,         //记录请求第几页的数据
        },
        new:{
          list:[],        //新款的数据
          page:0,
        },
        sell:{
          list:[],        //精选的数据
          page:0,
        },
        
      }
    }
  },
  components:{
    TabControl,
    HomeRecommend,
    HomePopular,
    GoodsList,
    // BackTop
  },
  mixins:[backTopMixin],
  created(){
    // console.log("home")
    this.getHomeMultidata(),
    // this.getHomeGoods('pop')
    // this.getHomeGoods('new')
    // this.getHomeGoods('sell')
    //请求 三类不同的数据  pop new sell
    // Object.keys(this.types).forEach(type =>{this.getHomeGoods(type)})
    Object.keys(this.types).forEach(this.getHomeGoods)
  },
  mounted(){
    //减少this.$refs.scroll.refresh 函数执行的频率
    //函数防抖
    const debounce = function(fn,time) {
      let timer = null
      return function() {
        clearTimeout(timer)
        timer = setTimeout(fn,time);
      }
    }

    const refresh =  debounce( this.$refs.scroll.refresh, 500 )

    //监听ImgLoad事件
    this.$bus.$on('imgLoad',refresh)
  },
  methods:{
    async getHomeMultidata(){
      const result = await reqHomeMultidata()
      // console.log(result);

      //数组的每一项是个对象  对象的image属性是src
      this.banner = result.data.banner.list.map(item=>item.image)
      this.recommend = result.data.recommend.list
    },
    async getHomeGoods(type){
      // console.log(type)
      const page = ++this.goods[type].page
      const result = await reqHomeGoods(type,page)
      // console.log(result)
      
      this.goods[type].list.push(...result.data.list)
      
    },
    tabClick(index){
      // console.log(index)
      // this.currentType = this.typeList[index]
      //保持两个TabControl组件的行为一致
      this.$refs.tabControl1.currentIndex = this.$refs.tabControl2.currentIndex = index
      this.currentType = Object.keys(this.types)[index]
    },
    loadMore(){//加载对应类型数据
         this.getHomeGoods(this.currentType)
         //使用子组件的方法  执行该方法是让 better scroll知道数据已经加载完成了
         this.$refs.scroll.finishPullUp()
    },
    getPosition(position){
      // console.log(position,this.$refs.tabControl.$el.offsetTop)
      
      const positionY = -position.y
      
      const isShowTabControl = positionY >= this.$refs.tabControl2.$el.offsetTop
      
      // if(positionY >= this.$refs.tabControl2.$el.offsetTop){
      //   this.isShowTabControl = true
      // }else{
      //   this.isShowTabControl = false
      // }

      this.isShowTabControl = isShowTabControl

      this.isShowBackTop = positionY >= 1000
    },
    // backTop(){  //点击滚动到顶部
    //       this.$refs.scroll.scrollTo(0,0)
    // }
  },

  activated(){
    // this.$refs.scroll.scrollTo(0,this.offsetTop)
    
  },
  deactivated(){
    this.offsetTop = this.$refs.scroll.scroll.pointY  //通过ref绑定原生dom从中拿取滚动的距离放入offsetTop
    // console.log()

  }
  
}
</script>

<style  scoped>

.nav-bar{
  background-color: pink;
  font-weight: bold;
  color:#fff;
}
.wrapper{
  /* height: calc(100vh - 93px)  vh -- viewport height 整个设备的高度 */
  /* // height: 644px;           less 会导致编译的不一致 sass没问题 */
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  bottom:49px;

}
.tabControl{
  position: relative;
  z-index: 1;
  background-color: #fff;
}
</style>
