<template>
  <div id="app">
    <h1>LIST</h1>
    <div class="notification" v-for="(item, idx) in items" :key="item._id">
      <p>
        <span class="tag is-primary">{{idx + 1}}</span>
        {{item.description}}
        </p>
    </div>
  </div>
</template>

<script> 
import axios from "axios";

export default {
  name: 'App',
  data(){
    return {
      items: []
    }
  },

  async mounted(){
    const response = await axios("/api/bucketListItems");
    this.items = response.data;
  }
}
</script>

<style>
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
 
</style>
