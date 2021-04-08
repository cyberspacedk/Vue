<template>
  <div id="app">
    <h1 class="subtitle has-text-centered">Bucket List:</h1>
    <hr />

    <div class="field has-addons">
      <div class="control is-expanded">
        <input type="text" class="input" placeholder="Go to mars..." v-model="description">
      </div>
      <div class="control">
        <button class="button is-info" @click="addItem" :disabled="!description">Add</button>
      </div>
    </div>

    <div class="notification" v-for="(item, idx) in items" :key="item._id">
      <div class="columns">
        <!-- Content section -->
        <input type="text" class="column input" v-if="isSelected(item)" v-model="editDescription">
        <p class="column" v-else>
          <span class="tag is-primary">{{idx + 1}}</span>
          {{item.description}}
        </p>

        <!-- Controls section -->
        <div class="column is-narrow">
          <span class="icon has-text-primary" @click="isSelected(item) ?  deselect() : select(item)">
            <i class="material-icons">{{isSelected(item) ? "close" : "edit"}}</i>
          </span>
          <span class="icon has-text-info" @click="isSelected(item) ? updateItem(item) : removeItem(item, i)">
            <i class="material-icons">{{isSelected(item) ? "save" : "delete"}}</i>
          </span>
        </div>

      </div>
    
    </div>
  </div>
</template>

<script> 
import axios from "axios";

export default {
  name: 'App',
  data(){
    return {
      items: [], 
      description: "",
      editDescription: "",
      selected: {}
    }
  },

  async mounted(){
    const response = await axios("/api/bucketListItems");
    this.items = response.data;
  },

  methods: {
    async addItem(){
      const response = await axios.post("/api/bucketListItems", {
        description: this.description
      });
      this.items.push(response.data);
      this.description = ""
    },

    async removeItem(item){
      await axios.delete(`/api/bucketListItems/${item._id}`);
      this.items = this.items.filter((el) => el._id !== item._id)
    },

    async updateItem(item){
      await axios.put(`/api/bucketListItems/${item._id}`, {
        description: this.editDescription
      });
      this.items = this.items.map(el => el._id === item._id ? {...el, description: this.editDescription} : el);
      this.deselect();
    },

    select(item){
      this.selected = item;
      this.editDescription = item.description;
    },

    deselect(){
      this.selected = {},
      this.editDescription = ""
    },

    isSelected(item){
      return item._id === this.selected._id
    }
  }
}
</script>

<style>
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}

span i {
  cursor: pointer;
}
 
</style>
