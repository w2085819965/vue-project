<template>
    <div id="SliderTransition">
        <transition
            :name="name"
        >
            <slot> </slot>
        </transition>
    </div>
</template>


<script>
    export default{
        name:"SliderTransition",
        props:{
            name:{
                type:String
            }
        }
    }

</script>


<style scoped lang="less">




    
.left-enter-active{//进入进行

  transform: translateX(100%);
  transition: 1s;
}

.left-enter-to{//进入结束
  transform: translateX(0);
}


.left-leave-active{//离开进行
  transform: translateX(0);
  transition: 1s;
}

.left-leave-to{//离开结束
  transform: translateX(-100%);
}


.right-enter-active{//进入进行

  transform: translateX(-100%);
  transition: 1s;
}

.right-enter-to{//进入结束
  transform: translateX(0);
}


.right-leave-active{//离开进行
  transform: translateX(0);
  transition: 1s;
}

.right-leave-to{//离开结束
  transform: translateX(100%);
}



</style>