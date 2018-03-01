<template>
  <div id="app">
    <m-header v-bind:seller="seller"></m-header>
    <div class="tab">
      <div class="tab-tiem">
        <router-link to="/goods">商品</router-link>
        <router-link to="/ratings">评论</router-link>
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from './components/header/header'
const ERR_OK = 0
export default {
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.$http.get('/api/seller').then((response) => {
      response = response.body
      if (response.erron === ERR_OK) {
        this.seller = response.data
      }
    })
  },
  components: {
    'm-header': header
  }
}
</script>

<style lang="stylus">
@import './common/stylus/mixin.styl'
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-tiem
        flex: 1
        text-align: center
        & > a
          width: 33%
          display: block
          float: left
          font-size: 14px
          color: rgb(77, 85, 93)
          &.router-link-active
            color: #000
            font-weight: bold
</style>
