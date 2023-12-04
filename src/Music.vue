<template>
  <div id="music">
    <div class="category-header musicHeader"><h1>Music</h1></div>
    <div class="items">
      <MusicItem v-for="item in musicItems" :key="item.name" :item="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import MusicItem from "./components/MusicItem.vue"; // Stellen Sie sicher, dass Sie eine MusicItem-Komponente haben
import "font-awesome/css/font-awesome.min.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./main.ts";

interface StoreItem {
  name: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  image: string;
  category: string;
}
const musicItems = ref<StoreItem[]>([]);

onBeforeMount(async () => {
  const musicCollection = collection(db, "music"); // Aktualisiert auf die Musiksammlung
  const musicSnapshot = await getDocs(musicCollection);
  musicItems.value = musicSnapshot.docs.map(
    (doc) => doc.data() as StoreItem
  );
});
</script>

<style scoped>
.category-header {
  background-size: cover;
  padding: 1px;
  text-shadow: -2px -2px 0 #000000, 2px -2px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
  color: white;
}
.musicHeader {
  background-image: url('https://images.musicstore.de/images/1280/j-und-d-e-gitarre-st-rock-hss-bk-black_1_GIT0015567-000.jpg'); 
}

.items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
  gap: 20px;
  margin: 20px;
  justify-content: center;
}
</style>
