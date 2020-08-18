<template>
    <div id="list">
        <div v-for="(item) in listData" :key="item.key" class="item">
            <span class="icon">
                <svg :fill="item.iconColor"><use :xlink:href="item"></use></svg>
            </span>
            <div class="info">{{item}}</div>
        </div>
    </div>
</template>

<script>
    export default{
        name:'ListView',
        props:{
            listData:{
                type:Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    
    #list {
        background-color: #fff;
        font-size: 15px;
        color: #333;
    }

    #list .item {
        height: 44px;
        line-height: 44px;
        position: relative;
    }

    .item .info {
        border-bottom: 1px solid rgba(100, 100, 100, .1);
        padding-left: 5px;
        text-indent: 20px;
    }

    .icon svg {
        width: 18px;
        height: 18px;
    }

    .item .icon {
        margin-top: 10px;
        position: absolute;
        left: 16px;
        
    }
</style>