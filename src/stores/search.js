import { defineStore } from "pinia";

export const searchStore = defineStore("search", {
  state: () => ({
    searchKey: null,
    searchField: "team",
  }),

  getters: {
    key: (state) => state.searchKey,
    field: (state) => state.searchField,
  },

  actions: {
    setSearchValue(key, field = "team") {
      this.searchKey = key;
      this.searchField = field;
    },
  },
});
