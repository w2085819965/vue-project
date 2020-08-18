<template>
  <div id="tab-Bar">
   <tab-Bar-Item path="/home" >
     <template v-slot:item-icon >
       <img src="~assets/img/tabbar/Home.svg" alt="">
     </template>
     <template v-slot:item-icon_active color="#fff">
       <img src="~assets/img/tabbar/Home_active.svg" alt="">
     </template>
     <template v-slot:item-text>
       <p>首页</p>
     </template>
   </tab-Bar-Item>
   <tab-Bar-Item path="/categroy" >
     <template v-slot:item-icon>
       <img src="~assets/img/tabbar/all.svg" alt="">
     </template>
     <template v-slot:item-icon_active>
       <img src="~assets/img/tabbar/all_active.svg" alt="">
     </template>
     <template v-slot:item-text>
       <p>分类</p>
     </template>
   </tab-Bar-Item>
   <tab-Bar-Item path="/market" >
     <template v-slot:item-icon>
       <img src="~assets/img/tabbar/cart.svg" alt="">
     </template>
      <template v-slot:item-icon_active>
       <img src="~assets/img/tabbar/cart_active.svg" alt="">
     </template>
     <template v-slot:item-text>
       <p>购物车</p>
     </template>
   </tab-Bar-Item>
   <tab-Bar-Item path="/profile" >
     <template v-slot:item-icon>
        <img src="~assets/img/tabbar/wode.svg" alt="">
     </template>
      <template v-slot:item-icon_active>
       <img src="~assets/img/tabbar/wode_active.svg" alt="">
     </template>
     <template v-slot:item-text>
       <p>我的</p>
     </template>
   </tab-Bar-Item>
   
  </div>
</template>

<script>



export default {
  name: 'TabBar',
  components:{

  }
 
}
</script>

<style scoped lang="less" >

#tab-Bar{
  display: flex;
  position: fixed;
  left:0;
  right: 0;
  bottom: 0;
  background-color:pink;
  img{
    width: 24px;
    height: 24px;
    margin-top:5px;
    
  }
  
}
</style>
