<template>
    <div id="user-info">
        <a href="#" class="clear-fix">
            <div class="privateImage left">
                <img src="~assets/img/profile/avatar.jpg" alt="">
                 <!-- ~assets/img/profile/avatar.jpg -->
            </div>
            <div class="login-info left">
                <p>登录/注册</p>
                <p class="phone">暂无绑定手机号</p>
            </div>
        </a>
    </div>
</template>

<script>
    export default{
        name:'UserInfo'
    }
</script>

<style lang="less" scoped>
     @import '~assets/css/varible.less';

     #user-info {
        background-color: @themColor;
        padding: 15px;
        margin-top: -5px;
        height: 60px;
    }

    #user-info .privateImage {
        width: 60px;
        height: 60px;
        background-color: #fff;
        border-radius: 30px;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
        }
    }

    .left {
        float: left;
    }

    #user-info .arrow-svg{
        width: 11px;
        height: 22px;
        margin-top: 18px;
    }

    #user-info .login-info {
        color: #fff;
        margin: 10px 0 0 10px;
    }

    #user-info .login-info .phone {
        position: relative;
        font-size: 13px;
        margin-top: 5px;
        font-weight: 300;
    }

    #user-info .login-info .phone .icon-mobile {
        position: absolute;
        width: 12px;
        height: 18px;
        left: -15px;
        top: 0;
    }
</style>