<template>
  <div class="content" ref="content">
    <table>
      <tr v-for="(item, index) in contentData" :key="index" class="content-x">
        <td v-for="(list, index) in item" :key="index" class="content-y">{{list}}</td>
      </tr>
    </table>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'content',
    props: ['contentData'],
    mounted() {
      this.$nextTick(() => {
        let content = this.$refs['content'];
        let height = content.offsetHeight;
        let rn = Math.floor(height / 32);
        this.$emit('changeRn', rn);
      });
    },
    data() {
      return {}
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .content
    flex 1
    table
      display block
      .content-x
        display flex
        height 32px
        box-sizing border-box
        &:nth-child(even)
          background #ecf6fd
        .content-y
          flex 1
          text-align center
          padding 5px;
</style>
