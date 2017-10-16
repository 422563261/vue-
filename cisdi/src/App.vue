<template>
  <div id="app">
    <VHead></VHead>
    <VContent :contentData="contentData" @changeRn="changeRn"></VContent>
    <VFootBar :pgAll="pgAll" :rn="rn" @changeCD="changeCD"></VFootBar>
  </div>
</template>

<script>
  import VHead from '@/components/head/head.vue';
  import VFootBar from '@/components/footBar/footBar.vue';
  import VContent from '@/components/content/content.vue';
  import axios from 'axios';

  export default {
    name: 'app',
    components: {
      VHead,
      VFootBar,
      VContent
    },
    created() {
    },
    data() {
      return {
        contentData: '',
        pgAll: '',
        rn: 10,
      }
    },
    methods: {
      changeCD(newValue) {
        this.contentData = newValue;
      },
      changeRn(newValue) {
        this.rn = newValue;
      }
    },
    watch: {
      rn(newVal) {
        axios.get('api/getcontent', {
          params: {
            rn: this.rn
          }
        })
          .then(res => {
            if (res.status === 200 && res.data) {
              this.contentData = res.data.pageArr;
              this.pgAll = res.data.pgAll;
            }
          })
      }
    }
  }
</script>

<style>
  @import "common/css/normalize.css";
  body, html {
    height: 100%;
  }
  body {
    display: flex;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
