import { defineStore } from "pinia"; // defines new Store

// Exporting a store named 'search', which is created using defineStore.
export const searchStore = defineStore("search", {
  // The state function returns the store's reactive state.
  state: () => ({
    searchKey: null,      // searchKey is used to store the current search term or keyword.
    searchField: "team",  // searchField is used to determine the field being searched (default is "team").
  }),

  getters: { // compute derived state based on the store's state
    key: (state) => state.searchKey,     // getter for accessing the searchKey.
    field: (state) => state.searchField, // getter for accessing the searchField.
  },

  // Actions are functions that can be called to update the store's state.
  actions: {
    setSearchValue(key, field = "team") { //updates searchKey and searchField state, default searchField is 'team'
      this.searchKey = key;     
      this.searchField = field; 
    },
  },
});
