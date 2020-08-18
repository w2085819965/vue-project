<template>
  <div id="profile">
      <common-nav-bar class="profile-nav">
        <template #middle>
          超级商场
        </template>
      </common-nav-bar>

  
      <common-scroll>
         <user-info></user-info>
        <shop-account></shop-account>
        <list-view :list-data="orderList" class="order-list"></list-view>
        <list-view :list-data="serviceList" class="service-list"></list-view>
        <list-view :list-data="moreList" class="more-list"></list-view>

      </common-scroll>
     
  </div>
</template>

<script>

import UserInfo from './base/UserInfo'
import ListView from './base/ListView'
import ShopAccount from './base/ShopAccount'
export default {
  name: 'ProFile',
  data(){
    return {
      orderList: [
        '我的消息',
        '积分商城',
        '会员卡'
      ],
      serviceList: [
        '我的购物车',
        '下载购物APP',
      ],
      moreList: [
        '设置',
        '更多',
      ],
    }
  },
  components: {
    UserInfo,
    ListView,
    ShopAccount
  }
}
</script>

<style lang="less" scoped>
@import '~assets/css/varible.less';

.wrapper{
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  bottom:49px;
}


#profile{
  height: 100vh;
  // position: relative;
  background-color: #f2f2f2;
}

.profile-nav{
  background-color: @themColor;
  color: #fff;
}


.oeder-list, .service-list {
  margin-top: 12px;
}

.oeder-list, .more-list {
  margin-top: 12px;
}
</style>
