<template>
  <div id="tab-Bar-Item" @click="handleClick" >

    <div v-show="active">
       <slot name="item-icon"></slot>
    </div>
    <div v-show="!active">
        <slot name="item-icon_active"></slot>
    </div>
     
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
      
  </div>
</template>

<script>


export default {
  name: 'TabBarItem',
  props:{ 
    path:{
      type:String,
      required:true
    },
    color:{
      type:String,
      default:"#fff"
    }
  },
  methods:{
    handleClick(){
    
      this.$router.push(this.path)

      // console.log(this.$route)
      // console.log(this.$router)
    },
    
  },
  computed:{
    active(){
      return this.$route.path===this.path
    },
    activeStyle(){
      return this.active?{color:this.color}:{}
    }
  }
}
</script>

<style lang="less">
#tab-Bar-Item{
  flex: 1;
  text-align: center;
  height: 49px;
}
</style>
