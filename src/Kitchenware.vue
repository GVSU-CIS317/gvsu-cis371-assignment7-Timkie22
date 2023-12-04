<template>
  <div id="kitchenware">
    <div class="category-header kitchenwareHeader"><h1>Kitchenware</h1></div>
    <div class="items">
      <KitchenwareItem v-for="item in kitchenwareItems" :key="item.name" :item="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import KitchenwareItem from "./components/KitchenwareItem.vue"; 
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
const kitchenwareItems = ref<StoreItem[]>([]);

onBeforeMount(async () => {
  const kitchenwareCollection = collection(db, "kitchenware"); // Update to the new category collection
  const kitchenwareSnapshot = await getDocs(kitchenwareCollection);
  kitchenwareItems.value = kitchenwareSnapshot.docs.map(
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
.kitchenwareHeader {
  background-image: url('https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2l0Y2hlbndhcmV8ZW58MHx8MHx8fDA%3D'); 
}

.items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
  gap: 20px;
  margin: 20px;
  justify-content: center;
}
</style>
