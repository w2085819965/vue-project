<template>
  <div id="Market">
     <common-nav-bar>
        <template #left>
          
        </template>
        <template #middle>购物街({{$store.getters.productsLength}})</template>
        <template #right></template>
      </common-nav-bar>

    <common-scroll
        @getPosition="getPosition"
        :probe-type="3"
         ref="scroll"
    >
      <market-list/>
        
    </common-scroll>
      
  <market-bottom-bar></market-bottom-bar>
  <back-top @backTop ="backTop" v-show="isShowBackTop" :bottom="'100px'"></back-top>
  </div>

</template>

<script>
import {backTopMixin} from 'utils/mixins'

import MarketList from './base/MarketList'
import MarketBottomBar from './base/BottomBar'
export default {
  name: 'Market',
  mixins:[backTopMixin],
  components: {
    MarketList,
    MarketBottomBar
  },
  methods:{
    getPosition(position){
      // console.log(position)
      
      const positionY = -position.y


      this.isShowBackTop = positionY >= 100
    },
  }

}
</script>

<style lang="less" scoped>

.nav-bar{
  background-color: pink;
  font-weight: bold;
  color:#fff;
}

.wrapper{
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  bottom:93px;
}
</style>
