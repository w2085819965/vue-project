<template>
    <div class="bottom-menu">
        <check-button class="select-all" @click.native="btnClick" :checked="isCheckAll"></check-button>
        <span>全选</span>
        <span class="total-price">合计：￥{{this.total.toFixed(2)}}</span>
        <span class="buy-product" @click="calc">去计算({{this.SelectProductsLength}})</span>
    </div>
</template>

<script>

    // import Toast from 'components/content/toast/Toast'


    import CheckButton from './CheckButton.vue'
    import {mapGetters,mapMutations} from 'vuex'
    export default{
        name:"BottomBar",
        components:{
            CheckButton,
            // Toast
        },
        computed:{
            ...mapGetters(['isCheckAll','SelectProductsLength','total']),
           
        },
        methods:{
            ...mapMutations(['isSelectAll']),
            btnClick(){
                // console.log('btnClick')
                this.isSelectAll(!this.isCheckAll)
            },
            calc(){
                // console.log(this.$toast)
                 this.$toast.show(`商品总和为￥${this.total.toFixed(2)}`)
            }
        }
    }
</script>

<style scoped>
    .bottom-menu {
        width: 100%;
        height: 44px;
        background-color: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        box-shadow: 0 -2px 3px rgba(0,0,0,.2);
        font-size: 14px;
        color: #888;
        line-height: 44px;
        padding-left: 35px;
        box-sizing: border-box;
    }

    .bottom-menu .select-all {
        position: absolute;
        line-height: 0;
        left: 12px;
        top: 13px;
    }

    .bottom-menu .total-price{
        margin-left: 15px;
        font-size: 16px;
        color: #666;
    }

    .bottom-menu .buy-product {
        background-color: #59c3e5;
        color: #fff;
        width: 100px;
        height: 44px;
        text-align: center;
        line-height: 44px;
        float: right;
    }

</style>