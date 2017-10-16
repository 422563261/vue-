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
  import format from '@/common/js/format';

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
        let {pageArr, pgAll} = format(this.rn, this.page);
        this.contentData = pageArr;
        this.pgAll = pgAll;
      },

    },
    watch: {
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
