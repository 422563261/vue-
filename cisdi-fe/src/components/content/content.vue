<template>
  <div class="content" ref="content">
    <table>
      <tr v-for="(item, index) in inlineData" :key="index" class="content-x">
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
      this.resize();
      window.onresize = () => {
        if (!this.wait) {
          this.wait = new Date();
        } else {
          let now = new Date();
          if (now - this.wait < 1000) {
            return;
          }
        }
        this.resize();
      }
    },
    data() {
      return {
        inlineData: '',
        rn: '',
        wait: ''
      }
    },
    methods: {
      resize() {
        this.inlineData = null;
        this.$nextTick(() => {
          let content = this.$refs['content'];
          let height = content.offsetHeight;
          let rn = Math.floor(height / 32);
          let oldrn = this.rn;
          if (parseInt(rn) === parseInt(oldrn)) {
            this.inlineData = this.contentData;
            return false;
          }
          this.$emit('changeRn', rn);
        });
      }
    },
    watch: {
      contentData(newValue) {
        this.inlineData = newValue;
      },
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
