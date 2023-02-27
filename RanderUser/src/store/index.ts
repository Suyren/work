import { defineStore } from 'pinia';


export const useUserStore = defineStore('user', {
  state: () => ({
    favoriteUserList: localStorage.getItem('favoriteUserList') ? JSON.parse(localStorage.getItem('favoriteUserList') as string) : []
  }),
});
