<template>
  <div id="app">
    
        <slider-transition :name="name">
          <keep-alive exclude="Detail">
            <router-view class="center"></router-view>
          </keep-alive>
          
        </slider-transition>
        
        <tab-bar v-if="!$route.path.includes('detail')"></tab-bar>
        
  </div>
</template>

<script>



export default {
  name: 'App',
  data(){
    return{
      name:""
    }
  },
  watch:{
    $route(to,from){
      if(from.path==="/"){
        return
      }

      // console.log(to.meta,from.meta)

      if(to.meta.index>from.meta.index){
        this.name = "left"
      }else{
        this.name = "right"
      }
    }
  }
}


</script>

<style lang="less"  scoped>


.center{
  position: absolute;
  width: 100%;
  height: calc(100% - 49px);
}



</style>
