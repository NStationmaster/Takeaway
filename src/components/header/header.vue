<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" v-bind:src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
          <span v-if="seller.supports" class="support-count" @click="showBrief">
            <i class="icon-keyboard_right"></i>
          </span>
        </div>
        <div class="description">
          <span>{{seller.score}}</span>
          <span>·</span>
          <span>月售{{seller.sellCount}}单</span>
          <span>·</span>
          <span>{{ seller.description }}</span>
          <span>约{{ seller.deliveryTime}}分钟</span>
          <span>·</span>
          <span>距离{{seller.distance}}</span>
          
        </div>
        <div class="bulletin-text">{{seller.bulletin}}</div>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDettail">
      <span class="icon" :class="classMap[seller.supports && seller.supports[0].type]"></span>
      <span class="text">{{seller.supports && seller.supports[0].description}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img v-bind:src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail brief" v-show="briefShow" @click="hideBrief">
        <div class="brief-wrapper">
          <h1 class="name">
            <span class="brand"></span>
            {{seller.name}}
          </h1>
          <ul class="brief-ul">
            <li class="item">
              <h3 class="item-h3">{{seller.score}}</h3>
              <p class="item-p">评分</p>
            </li>
            <li class="item">
              <h3 class="item-h3">{{seller.sellCount}}单</h3>
              <p class="item-p">月售</p>
            </li>
            <li class="item">
              <h3 class="item-h3">{{seller.description}}</h3>
              <p class="item-p">约{{ seller.deliveryTime}}分钟</p>
            </li>
            <li class="item">
              <h3 class="item-h3">{{seller.deliveryPrice}}元</h3>
              <p class="item-p">配送费</p>
            </li>
            <li class="item">
              <h3 class="item-h3">{{seller.distance}}</h3>
              <p class="item-p">距离</p>
            </li>
          </ul>
          <h3 class="notice">
            <span>公告</span>
          </h3>
          <div class="brief-text">
            {{seller.bulletin}}
          </div>
        </div>
        <div class="brief-close" @click="hideBrief">
            <i class="icon-close"></i>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
      <div class="detail-wrapper" clearfix>
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item,index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from '../star/star.vue'
export default {
  components: {
    star
  },
  props: {
    seller: Object
  },
  data () {
    return {
      detailShow: false,
      briefShow: false
    }
  },
  methods: {
    showBrief () {
      // console.log(el)
      this.briefShow = true
    },
    showDettail () {
      this.detailShow = true
    },
    hideDetail () {
      this.detailShow = false
    },
    hideBrief () {
      this.briefShow = false
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>
<style lang="stylus">
@import "../../common/stylus/mixin.styl"
.header
  position: relative
  overflow: hidden
  background: rgba(7, 17, 27, 0.5)
  .background
    position: absolute
    z-index: -1
    top: 0
    left: 0
    width: 100%
    height: 100%
    filter: blur(10px)
  .content-wrapper
    position: relative
    margin-top: 68px
    padding: 30px 12px 10px 12px
    font-size: 0
    background: #fff
    text-align: center
    .avatar
      position: absolute
      top: 0
      left: 50%
      margin-top: -40px
      margin-left: -32px
      img
          border-radius: 2px
    .content
      display: inline-block
      .title
        margin: 2px 0 8px 0
        font-weight: 700
        .brand
          display: inline-block
          width: 30px
          height: 24px
          bg-image('brand')
          background-size: 30px 18px
          background-repeat: no-repeat
          background-position: center
        .name
          vertical-align: top
          margin-left: 6px
          font-size: 20px
          line-height: 20px
          font-weight: bold
      .description
        margin-bottom: 10px
        line-height: 12px
        font-size: 12px
        
        text-align: center
        color: #333
      .support
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 4px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .text
          vertical-align: top
          line-height: 12px
          font-size: 10px
    .bulletin-text
      margin: 10px 0
      font-size: 12px
      color:#999
      -webkit-transform: scale(0.95)
    .support-count
      position: absolute
      line-height: 20px
      height: 20px
      margin-left: 5px
      .count
        vertical-align: top
        font-size: 10px
      .icon-keyboard_arrow_right
        margin-left: 2px
        line-height: 24px
        font-size: 10px
  .bulletin-wrapper
    position: relative
    display: flex
    height: 22px
    line-height: 22px
    padding:0 35px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    border: 1px solid #eee
    color: #666
    background: #fff
    .icon
      display: inline-block
      vertical-align: top
      width: 20px
      height: 22px
      margin-right: 4px
      background-size: 16px 16px
      background-repeat: no-repeat
      background-position: center
      &.decrease
        bg-image('decrease_2')
      &.discount
        bg-image('discount_2')
      &.guarantee
        bg-image('guarantee_2')
      &.invoice
        bg-image('invoice_2')
      &.special
        bg-image('special_2')
    .text
      width: 270px
      overflow: hidden
      text-overflow:ellipsis
      white-space: nowrap
      font-size: 12px
    .bulletin-title
      display: inline-block
      vertical-align: top
      margin-top: 8px
      width: 22px
      height: 12px
      bg-image('bulletin')
      background-size: 22px 12px
      background-repeat: no-repeat
    .icon-keyboard_arrow_right
      position: absolute
      font-size: 10px
      right: 12px
      top: 4px 
  .detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: auto
    backdrop-filter: blur(10px)
    background: rgba(7, 17, 27, 0.8)
    color: #fff
    opacity: 1
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
    .detail-wrapper
      display: inline-block
      width: 100%
      min-height: 100%
      .detail-main
        margin-top: 64px
        padding-bottom: 64px
        .name
          line-height: 16px
          text-align:center
          font-size: 16px
          font-weight: 700
        .star-wrapper
          margin-top: 18px
          padding: 2px 0
          text-align: center
        .title
          display: flex
          width: 80%
          margin: 28px auto 24px auto
          .line
            flex: 1
            position: relative
            top: -6px
            border-bottom: 1px solid rgba(255, 255, 255, 0.2)
          .text
            padding: 0 12px
            font-size: 14px
            font-weight: 700
        .supports
          width: 80%
          margin: 0 auto
          .support-item
            padding: 0 12px
            margin-bottom: 12px
            font-size: 0
            &:last-child
              margin-bottom: 0
            .icon
              display: inline-block
              width: 16px
              height: 16px
              vertical-align: top
              margin-right: 6px
              background-size: 16px 16px
              background-repeat: no-repeat
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image('discount_2')
              &.guarantee
                bg-image('guarantee_2')
              &.invoice
                bg-image('invoice_2')
              &.special
                bg-image('special_2')
            .text
              font-size: 12px
              line-height: 16px
          .content
            padding: 0 12px
            line-height: 24px
            font-size: 12px
    .detail-close
      position: relative
      width: 32px
      height: 32px
      margin: -64px auto 0 auto
      clear: both
      font-size: 32px
  .brief
    display: flex
    justify-content: center
    align-items: center
    z-index: 60
    flex-direction: column
    color: #333
    .brief-wrapper
      position: relative
      width: 80%
      max-height: 300px
      padding: 28px 25px
      border-radius: 3px
      overflow: hidden
      background: #fff
      z-index: 70
      flex-direction: column
      will-change: transform
      .name
        text-align: center
        font-weight: bold
        font-size: 22px
        color: #333
        .brand
          display: inline-block
          width: 30px
          height: 18px
          bg-image('brand')
          background-size: 30px 18px
          background-repeat: no-repeat
      .brief-ul
        display: flex
        margin-top: 20px
        .item
          flex: 1
          text-align: center
          .item-h3
            margin-bottom: 6px
            font-weight: 600
            font-size: 14px
          .item-p
            font-size: 12px
            color: #999
      .notice
        text-align:center
        margin:14px auto 10px
        width: 152px
        background-image: linear-gradient(90deg,#fff,#333 50%,#fff)
        background-repeat: no-repeat
        background-position: 50%
        background-size: 100% 1px
        & > span
          padding:0 1.066667vw
          color:#999
          font-size: 12px
          background-color:#fff
      .brief-text
        text-align: center
        font-size: 14px
    .brief-close
      padding: 2px
      margin-top: 10px
      width: 26px
      height: 26px
      clear: both
      font-size: 26px
      color: #fff
      border: 1px solid #fff
      border-radius: 50%
</style>
