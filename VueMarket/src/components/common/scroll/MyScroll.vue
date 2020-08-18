<template>

    <div class="wrapper" ref="wrapper"> 
        <div>
            <slot></slot>
        </div>
        
    </div>
</template>

<script>
    import BScroll from "better-scroll"
    export default{
        name:"CommonScroll",
        props:{
            pullUpLoad:{
                type:Boolean,
                default:false
            },
            probeType:{
                type:Number,
                default:0
            }
        },
        data(){
            return {
                scroll:null
            }
        },
        mounted(){
            // console.log(scroll)
            this.scroll = new BScroll(this.$refs.wrapper,{
                click:true, //允许点击
                pullUpLoad:this.pullUpLoad,// 上拉加载更多数据
                probeType:this.probeType//允许监听滚动
            })
            // console.log( this.scroll )
            // new BScroll(this.$refs.wrapper)   //vue原生写法
        
            //监听滚动到区域最底部 默认只能监听到一次
            this.scroll.on('pullingUp',()=>{
                // console.log('触发事件')
                this.$emit("loadMore")
            })

            // console.log(this.scroll)
            this.scroll.on("scroll",(position)=>{
                // console.log(position)
                this.$emit("getPosition",position)
            })


        },
        methods:{
            finishPullUp(){
                this.scroll.finishPullUp()
            
            },
            scrollTo(x,y,time=500){
                this.scroll.scrollTo(x,y,time)
            },
            refresh(){
                // console.log('refresh',this.scroll.scrollerHeight)
                this.scroll.refresh()
            }
        }
    }
</script>

<style scoped>
    
</style>