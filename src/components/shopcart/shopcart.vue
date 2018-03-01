<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleList">
          <div class="logo-wrapper">
            <div class="logo" :class="[{'highlight':totalCount>0},{'tiaodong':tiao===true}]">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">¥{{totalPrice}}</div>
          <div class="desc">配送费¥{{deliveryprice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass" @click="pay">{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-animation">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropPing" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <span class="title">已购商品</span>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectfoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>¥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" @add="ballAdd"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
        <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>
<script>
  import cartcontrol from '../cartcontrol/cartcontrol'
  import BScroll from 'better-scroll'
  export default {
    components: {
      cartcontrol
    },
    props: {
      deliveryprice: {
        type: Number,
        default: 0
      },
      minprice: {
        type: Number,
        default: 0
      },
      selectfoods: {
        type: Array,
        default () {
          return [
            {
              price: 10,
              count: 1
            }
          ]
        }
      }
    },
    methods: {
      toggleList () {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      hideList () {
        this.fold = true
      },
      empty () {
        this.selectfoods.forEach((food) => {
          food.count = 0
        })
      },
      pay () {
        if (this.totalPrice < this.minprice) {
          return
        }
        window.alert(`支付${this.totalPrice}元`)
        console.log(this.selectfoods)
      },
      drop (el) {
        this.tiao = false
        // console.log(2)
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      ballAdd (target) {
        this.drop(target)
      },
      beforeDrop (el) {
        // console.log(3)
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      dropPing (el, done) {
        // console.log(4)
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
          el.addEventListener('transitionend', done)
        })
      },
      afterDrop (el) {
        // console.log(5)
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
          this.tiao = true
        }
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectfoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectfoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return '¥' + this.minprice + '元起送'
        } else if (this.totalPrice < this.minprice) {
          let diff = this.minprice - this.totalPrice
          return '还差¥' + diff + '元起送'
        } else {
          return '去结算'
        }
      },
      payClass () {
        if (this.totalPrice < this.minprice) {
          return 'no-enough'
        } else {
          return 'enough'
        }
      },
      listShow () {
        // console.log(this.totalCount)
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true,
        tiao: false
      }
    }
  }
</script>
<style lang="stylus">
@import "../../common/stylus/mixin.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        background-color: rgba(61,61,63,.9)
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background: #444
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #363636
            text-align: center
            &.highlight
              background: rgb(0, 160, 220)
            &.tiaodong
              animation: myfirst 0.3s infinite
              animation-iteration-count: 1
              @keyframes myfirst
                0%
                  transform: translate(0px, 0px)
                50%
                  transform: translate(0px, -10px)
                100%
                  transform: translate(0px, 0px)
            .icon-shopping_cart
              font-size: 24px
              line-height: 44px
              color: #80858a
              &.highlight
                color: #fff            
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700px
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
            color: #fff
        .price
          display: inline-block
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          color: #fff
          &.highlight
                color: #fff
        .desc
          display: inline-block
          line-height: 24px
          margin: 12px 0 0 12px
          color: rgba(255, 255, 255, 0.4)
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          color: #fff
          font-weight: 700
          font-size: 12px
          background: #2b343c
          &.enough
            color: #fff
            background: #00b43c
          &.no-enough
            background: #535356
    .ball-animation
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.74, -0.13, 0.85, 0.65)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
    .shopcart-list
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          height: 40px
          line-height: 40px
          font-size: 14px
          color: #666
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        background: #fff
        overflow: hidden
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    bockground-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &fade-enter-active, &fade-leave-active
      transform: all 0.5s
    &fade-enter, &fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
</style>