import BackTop from "components/content/backtop/backTop"


export const backTopMixin = {
    data(){
        return {
            isShowBackTop:false, //初始不显示返回顶部组件
        }
    },
    components:{
        BackTop
    },
    methods:{
        backTop(){  //点击滚动到顶部
            this.$refs.scroll.scrollTo(0,0)
        }
    }
   
}