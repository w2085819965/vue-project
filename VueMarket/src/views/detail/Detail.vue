<template>
    <div class="detail">
        <detail-nav-bar ref="navbar" @itemClick="itemClick"></detail-nav-bar>
        
        <common-scroll 
                @getPosition="getPosition"
                :probe-type="3"
                class="wrapper"
                ref="scroll">
            <common-swiper :padding-bottom="'80%'" :banner="banner"></common-swiper>
            <detail-goods-info :goods-info="goodsInfo"></detail-goods-info>
            <detail-shop-info :shop="shopInfo"></detail-shop-info>
            <detail-image-info 
                @imgLoad="imgLoad"
                :image-info="imageInfo"></detail-image-info>
            <detail-params-info ref="params" :params-info="paramsInfo"></detail-params-info>
            <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
            

            <detail-goods-list ref="goods" :goods="recommendInfo" > 
             
           </detail-goods-list>

           
        </common-scroll>
        <detail-bottom-bar @addMarket="addMarket"></detail-bottom-bar>
        <back-top @backTop ="backTop" v-show="isShowBackTop"></back-top>
        
    </div>
    
</template>

<script>
    
    import {mapGetters} from "vuex"
    import {
        reqDetails,
        GoodsInfo,
        shopInfo,
        GoodsParam,
        CommentInfo,
        reqRecommends,
        }from "api/detail"

    // import Toast from 'components/content/toast/Toast'

    import DetailGoodsList from "components/content/goodslist/GoodsList"
    
    // import BackTop from "components/content/backtop/backTop"
    import {backTopMixin} from "utils/mixins"

    import DetailNavBar from "./base/NavBar"
    import DetailShopInfo from "./base/ShopInfo"
    import DetailGoodsInfo from "./base/GoodsInfo.vue"
    import DetailImageInfo from "./base/ImageInfo"
    import DetailParamsInfo from "./base/ParamsInfo"
    import DetailCommentInfo from "./base/CommentInfo"
    import DetailBottomBar from "./base/BottomBar"
   
   
    

    export default{
        name:"Detail",
        data(){
            return {
                banner:[],
                goodsInfo:{},
                shopInfo:{},
                imageInfo:{},
                paramsInfo:{},
                commentInfo:{},
                recommendInfo:[],
                offsetTopList:[],  //内部的值 需要在前面几个组件渲染后获取
                // isShowBackTop:false, //初始不显示返回顶部组件
                iid:[],
                
            }
        },
        components:{
            DetailNavBar,
            // Toast,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailImageInfo,
            DetailParamsInfo,
            DetailCommentInfo,
            DetailGoodsList,
            DetailBottomBar,
            // BackTop
        },
        mixins:[backTopMixin],
        created(){
            this.getDetails()
            this.getRecommends()
        },
        computed:{
            ...mapGetters(['count'])
        },
        mounted(){
            // console.log(this.$refs.params.$el.offsetTop)
            
        },
        methods:{
            
            async getDetails(){
                this.iid = this.$route.params.iid
                const {result} = await reqDetails(this.iid)
                // console.log(result)
                //  console.log(result.itemInfo.topImages)
                //轮播图数据  数组的每一项是图片的src
                this.banner = result.itemInfo.topImages


                //商品信息
                this.goodsInfo = new GoodsInfo(result.itemInfo, result.columns, result.shopInfo.services)
            

                
                //商铺信息
                this.shopInfo = new shopInfo(result.shopInfo)
            
                //商品图片信息
                this.imageInfo = result.detailInfo

                //参数信息
                this.paramsInfo = new GoodsParam(result.itemParams.info,result.itemParams.rule)
           
                //评论信息
                if(result.rate.cRate !== 0){
                    this.commentInfo = new CommentInfo(result.rate.list[0]);
                }
           },
            async getRecommends(){
                const result =  await reqRecommends()
                // console.log(result)
                //获取推荐的图片数据
                this.recommendInfo = result.data.list
           },
           getPosition(position){
                // console.log("detail",position)
                const positionY = -position.y
                const [a,paramsOffsetTop,commentOffsetTop,goodsOffsetTop] = this.offsetTopList
                // console.log(a,paramsOffsetTop,commentOffsetTop,goodsOffsetTop)
                // if(positionY>=a&&positionY<paramsOffsetTop){
                //     this.$refs.navbar.currentIndex = 0
                // }else if(positionY>=paramsOffsetTop&&positionY<commentOffsetTop){
                //     this.$refs.navbar.currentIndex = 1
                // }else if(positionY>=commentOffsetTop&&positionY<goodsOffsetTop){
                //     this.$refs.navbar.currentIndex = 2
                // }else if(positionY>=goodsOffsetTop){
                //     this.$refs.navbar.currentIndex = 3
                // }


                for (let i in this.offsetTopList){
                      
                     
                    if(i==this.offsetTopList.length-1)break
                    let currentIndex =  this.$refs.navbar.currentIndex
                    //只有页面显示在对应的位置 才去做后面的判断 滚动的时候不进行判断  只做4次判断 对性能提高了
                    if(currentIndex!=i && positionY>=this.offsetTopList[i]&&positionY<this.offsetTopList[+i+1]){
                    //  console.log(i)
                        this.$refs.navbar.currentIndex = +i
                    }
                }

                this.isShowBackTop = positionY>=1000
                
            },
           itemClick(index){    //我们认为当图片已经加载好之后  用户才会点击按钮
                //    console.log(index)
                //如何获取 不同index对应的不同的滚动位置
                this.$refs.scroll.scrollTo(0,-this.offsetTopList[index],200)
           },
           imgLoad(count){
                this.offsetTopList.push(
                    0,
                    this.$refs.params.$el.offsetTop,
                    this.$refs.comment.$el.offsetTop,
                    this.$refs.goods.$el.offsetTop,
                    10000
                )
                //  console.log(`第${count}图片加载完成`,this.offsetTopList)
           },
            //  backTop(){  //点击滚动到顶部
            //     this.$refs.scroll.scrollTo(0,0)
            // }
            addMarket(){    //把商品数据添加到购物车
            // console.log('addMarket')
                const product = {}
                product.iid = this.iid
                product.image = this.banner[0]
                product.title = this.goodsInfo.title
                product.desc = this.goodsInfo.desc
                product.price = this.goodsInfo.realPrice
                
                // console.log(product)
                //commit  vuex的传递方法
                this.$store.commit('addMarket',product)
                // console.log(this.$store.getters.count(this.iid))
                // alert(this.$store.getters.count(this.iid))
                // this.$refs.toast.isShow = true
                // this.$refs.toast.message = `当前购物车数量为${this.count(this.iid)}`

                // setTimeout(()=>{
                //     this.$refs.toast.isShow = false
                //     this.$refs.toast.message = ''
                // },2000)
                // this.$refs.toast.show(`当前购物车数量为${this.count(this.iid)}`)
                //    console.log( this.$toast)
                this.$toast.show(`当前购物车数量为${this.count(this.iid)}`)
           }
        }
    }

</script >

<style scoped >
    .wrapper{
        /* height: calc(100vh - 93px)  vh -- viewport height 整个设备的高度 */
        /* // height: 644px;           less 会导致编译的不一致 sass没问题 */
        position: fixed;
        top: 44px;
        left: 0;
        right: 0;
        bottom: 58px;

    }
</style>