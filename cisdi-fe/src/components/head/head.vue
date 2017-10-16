<template>
  <header class="head">
    <h1>CISDI中冶赛迪</h1>
    <ul class="head-all">
      <li class="head-list" v-for="(item, index) in headName" :key="index">{{item}}</li>
    </ul>
  </header>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import apiContent from '@/common/api/test.json';

  export default {
    name: '',
    data() {
      return {
        headName: ''
      }
    },
    created() {
      this.headName = apiContent[0];
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .head
    flex 0 0 100px;
    height 100px;
    box-sizing border-box
    overflow hidden
    h1
      text-align center
      padding 10px 0
      background #404040
      color #fff
    .head-all
      display flex
      padding 5px 0
      border-bottom 1px solid #333
      background #ececec
      .head-list
        flex 1
        text-align center
        font-weight bold
        color #525252
</style>
