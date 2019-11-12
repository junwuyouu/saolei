<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="msg" v-on:msgChange="msgChange" />
    <div class="father">
      <dir v-for="(item, index) in arr" class="son" :key="index">{{ index }}</dir>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: '修改前',
      arr: [1, 2, 3]
    };
  },
  methods: {
    msgChange(key) {
      console.log(key);
      this.msg = key;
    }
  }
};
</script>
<style lang="scss" scoped>
.father {
  background-color: rgb(102, 102, 102);
  width: 500px;
  max-height: 300px;
  overflow: scroll;
  margin-left: auto;
  margin-right: auto;
  .son {
    background-color: rgb(142, 165, 165);
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
    padding: 0px;
  }
}
</style>