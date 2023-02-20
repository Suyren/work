<template lang="pug">

</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
axios.get("https://randomuser.me/api/").then((res: any) => {
  console.log(res);
});
const list: any = ref([]);
</script>
