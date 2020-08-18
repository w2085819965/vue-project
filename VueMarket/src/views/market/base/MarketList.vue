<template>
    <div>
        <market-list-item v-for="product in products" :item-info="product" :key="product.key"></market-list-item>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import MarketListItem from './MarketListItem'
   
    export default{
        name:"MarketList",
        components:{
            MarketListItem
        },
        computed:{
            ...mapState(['products'])
        }
    }
</script>

<style scoped>
    
</style>