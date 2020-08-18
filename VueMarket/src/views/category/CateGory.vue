<template>
  <div id="CateGory">
      <common-nav-bar>
        <template #middle>分类</template>
      </common-nav-bar>

      <!-- 左侧滚动区 -->
      <common-scroll  class="wrapper1">
        <category-left-nav @itemclick="itemclick" :categorys="categorys"></category-left-nav>
      </common-scroll>
       <!-- 右侧滚动区 -->
     
     <common-scroll class="wrapper2">
        <category-grid-view :subcategory="subcategory"></category-grid-view>
         <tab-control 
            @tabClick="tabClick"
            :titles="Object.values(types)"></tab-control>

           <goods-list :goods='goods[currentType].list'/> 
     </common-scroll>
  </div>
</template>

<script>

import {reqCategory,reqSubcategory,reqCategoryDetail} from "api/category"

import CategoryLeftNav from "./base/LeftNav"
import CategoryGridView from "./base/GridView"


import TabControl from "components/content/tabcontrol/TabControl"
import GoodsList from "components/content/goodslist/GoodsList"
export default {
  name: 'CateGory',
  data(){
    return {
      categorys:[],     //存储左侧滚动区域的数据
      subcategory:[],   //存储右侧subcategory(顶部)的数据
      currentIndex:0,
      currentType:'pop',
      // typeList:['pop','new','sell'],   //请求商品类型的数据
      types:{
        pop:"综合",
        new:"新品",
        sell:"销量",
      },
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
  created(){
    this.getCategory()
  },
  methods:{
    itemclick(index){
      if(index===this.currentIndex)return
      // console.log(index)
      this.currentIndex = index
      //获取右侧上部分的数据
      this.getSubcategory()
      //请求右侧的数据 用于渲染GoodsList 基于指定商品的miniWallkey
      // this.getSubcategoryDetail('pop')  //请求pop类型的数据
      // this.getSubcategoryDetail('sell')  //请求sell类型的数据
      // this.getSubcategoryDetail('new')  //请求new类型的数据
      // Object.keys(this.types).forEach(type=>this.getSubcategoryDetail(type))
      Object.keys(this.types).forEach(this.getSubcategoryDetail)
    },
    tabClick(index){
      // this.currentType = this.typeList[index]
      this.currentType = Object.keys(this.types)[index]
    },
    async getCategory(){
      const result = await reqCategory()
      //左侧滚动区的数据
      this.categorys = result.data.category.list
      //请求右侧的数据 用于渲染categorys 基于指定商品的maitKey
      this.getSubcategory()
      //请求右侧的数据 用于渲染GoodsList 基于指定商品的miniWallkey
      // this.getSubcategoryDetail('pop')  //请求pop类型的数据
      // this.getSubcategoryDetail('sell')  //请求sell类型的数据
      // this.getSubcategoryDetail('new')  //请求new类型的数据
      // Object.keys(this.types).forEach(type=>this.getSubcategoryDetail(type))
      Object.keys(this.types).forEach(this.getSubcategoryDetail)
    },
    async getSubcategory(){
      const {maitKey} = this.categorys[this.currentIndex]
      const result =  await reqSubcategory(maitKey)
      this.subcategory = result.data.list
      
    },
    async getSubcategoryDetail(type){
      const {miniWallkey} = this.categorys[this.currentIndex]
      const result =  await reqCategoryDetail( miniWallkey,type )
      this.goods[type].list = result
    }
  },
  components:{
    CategoryLeftNav,
    CategoryGridView,
    TabControl,
    GoodsList
  }
}
</script>

<style lang="less" scoped>

.nav-bar{
  background-color: pink;
  font-weight: bold;
  color:#fff;
}

.wrapper1{
  position: fixed;
  top: 44px;
  bottom: 49px;
  width: 100px;
}

.wrapper2{
  position: fixed;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 100px;
}
</style>
