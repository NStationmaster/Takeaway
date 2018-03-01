<template>
  <transition name="move">
    <div v-show="showFlag" class="fooddetails" ref="food">
      <div class="food-header">
        <img :src="food.image">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="food-content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">¥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol @add="ballAdd" :food="food"></cartcontrol>
        </div>
        <transition name="fade">
          <div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirst">
            加入购物车
          </div>
        </transition>
      </div>
      <div class="split" v-show="food.info"></div>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <div class="split"></div>
    </div>
  </transition>
</template>
<script type="text/javascript">
  import Vue from 'vue'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import BScroll from 'better-scroll'
  export default {
    components: {
      cartcontrol
    },
    props: {
      food: Object
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide () {
        this.showFlag = false
      },
      ballAdd (target) {
        this.$emit('add', target)
      },
      addFirst (event) {
        // console.log(event.target)
        this.$emit('add', event.target)
        Vue.set(this.food, 'count', 1)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .fooddetails
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    z-index: 40
    width: 100%
    background-color: #fff
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .food-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: back
          padding: 10px
          font-size: 20px
          color: #fff
    .food-content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: bold
        color: rgb(7, 17, 27)
      .detail
        margin-bottom:18px
        line-height: 10px
        font-size: 0
        height: 10px
        .count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .count
          margin-right: 12px
      .price
        line-height: 24px
        font-weight: 700
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        height: 24px
        line-height: 24px
        padding: 0 12px
        border-radius: 12px
        box-sizing: border-box
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
        opacity: 1
        z-index: 10
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.2s
        &.fade-enter, &.fade-leave-active
          opacity: 0
          z-index: -1
    .split
      width: 100%
      height: 16px
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      background: #f3f5f7
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)
</style>