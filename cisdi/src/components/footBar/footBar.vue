<template>
  <div class="foot-bar">
    <ul class="bar-all" v-if="moreSeven">
      <li class="bar-list pre" @click="clickPre()"><</li>
      <li class="bar-list" :class="{'active': this.currentPg === 1}" @click="clickNormal($event)">1</li>
      <li class="bar-list" :class="{'active': this.currentPg === 2}" @click="clickNormal($event)">{{five - 3 | igFirst}}</li>
      <li class="bar-list" :class="{'active': this.currentPg === five - 2}" @click="clickThree()">{{five - 2}}</li>
      <li class="bar-list" :class="{'active': this.currentPg === five - 1}" @click="clickNormal($event)">{{five - 1}}</li>
      <li class="bar-list" :class="{'active': this.currentPg === five}" @click="clickFive()">{{five}}</li>
      <li class="bar-list" :class="{'active': this.currentPg === pgAll - 1}" @click="clickNormal($event)">{{pgAll - 1 | igSecond(five)}}</li>
      <li class="bar-list" :class="{'active': this.currentPg === pgAll}" @click="clickNormal($event)">{{pgAll}}</li>
      <li class="bar-list next" @click="clickNext()">></li>
      <li class="input">
        <span>前往</span><input type="text" class="bar-list" v-model="inputPg"
                              @keyup="check($event)"><span>页</span>
      </li>
    </ul>
    <ul class="bar-all" v-else>
      <li class="bar-list pre"><</li>
      <li class="bar-list" v-for="(item, index) in pgAll" :class="{'active': this.currentPg === index + 1}" :key="index" @click="clickNormal($event)">{{item}}</li>
      <li class="bar-list next">></li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios';

  export default {
    name: 'footBar',
    props: ['pgAll', 'rn'],
    data() {
      return {
        currentPg: 1,
        five: 5,
        inputPg: ''
      }
    },
    filters: {
      igFirst(value) {
        if (value >= 3) {
          return '…'
        } else {
          return value;
        }
      },
      igSecond(value, five) {
        if (value !== five + 1) {
          return '…'
        } else {
          return value;
        }
      }
    },
    computed: {
      selected(index) {
        return this.currentPg === index;
      }
    },
    methods: {
      moreSeven() {
        return this.pgAll > 7;
      },
      jump(page) {
        axios.get('/api/getcontent', {
          params: {
            page: page,
            rn: this.rn
          }
        })
          .then(res => {
            if (res.status === 200 && res.data) {
              this.currentPg = parseInt(res.data.currentPg);
              this.$emit('changeCD', res.data.pageArr);
              if (this.currentPg === 1) {
                this.five = 5;
              } else if (this.currentPg === this.pgAll) {
                this.five = this.pgAll - 2;
              }
            }
          })
      },
      clickFive() {
        this.jump(this.five);
        if (this.five < this.pgAll - 2) {
          this.five++;
        }
      },
      clickThree() {
        let page = this.five - 2;
        this.jump(page);
        if (this.five > 5) {
          this.five--;
        }
      },
      clickNext() {
        if (this.currentPg >= 4 && this.currentPg <= this.pgAll - 4) {
          this.five++;
        }
        if (this.currentPg >= this.pgAll) {
          return;
        }
        this.jump(++this.currentPg);
      },
      clickPre() {
        if (this.currentPg >= 5 && this.currentPg <= this.pgAll - 3) {
          this.five--;
        }
        if (this.currentPg <= 1) {
          return;
        }
        this.jump(--this.currentPg);
      },
      clickNormal(e) {
        if (/\d+/.test(e.target.innerText)) {
          this.jump(e.target.innerText);
        }
      },
      check(e) {
        if (!/^\d+$/.test(this.inputPg) || this.inputPg > this.pgAll || this.inputPg < 1) {
          this.inputPg = '';
          return;
        }
        if (e.keyCode === 13) {
          this.currentPg = this.inputPg;
          this.jump(this.currentPg);
        }
      }
    },
    watch: {}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .foot-bar
    display flex
    height 100px
    flex 0 0 100px
    justify-content center
    align-items center
    .bar-all
      color #1d1e22
      font-size 0
      font-weight bold
      .bar-list
        width 40px
        height 40px
        text-align center
        line-height 40px
        display inline-block
        font-size 14px
        background rgba(234, 234, 234, .5)
        border 1px solid #e5e5e5
        border-radius 5px
        margin 0 5px
        cursor pointer
        outline none
        &.active
          background #000
          color #fff
      .input
        margin-left 10px
        font-size 14px;
        display inline-block
        input
          border 1px solid #e5e5e5
          margin 0 5px
          box-sizing border-box
          background #fff
</style>
