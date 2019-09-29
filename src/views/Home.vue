<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :msg="msg" v-on:msgChange="msgChange"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data(){
	  return{
		    msg:"修改前"
	  }
  },
  methods:{
	  msgChange(key){
		  console.log(key)
		  this.msg=key;
	  }
  }
}
</script>
