<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="removeCart">
    </div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart">
    </div>  
  </div>
</template>
<script type="text/javascript">
  import Vue from 'vue'
  export default {
    props: {
      food: Object
    },
    methods: {
      addCart (event) {
        // if (!event._constructed) {
        //   return
        // }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
          this.food.count = 1
        } else {
          this.food.count++
        }
        this.$emit('add', event.target)
      },
      removeCart (event) {
        // if (!event._constructed) {
        //   return
        // }
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>
<style lang="stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      opacity: 1
      transform: translate3d(0, 0, 0)
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-decrease, .cart-add
      display: inline-block
      padding: 6px
      color: rgb(0, 160, 220)
      font-size: 24px
      line-height:24px
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
</style>