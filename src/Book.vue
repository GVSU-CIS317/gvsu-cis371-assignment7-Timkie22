<template>
  <div id="books">
    <div class="category-header booksHeader"><h1>Books</h1></div>
    <div class="items">
      <BookItem v-for="item in bookItems" :key="item.name" :item="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import BookItem from "./components/BookItem.vue"; 
import "font-awesome/css/font-awesome.min.css";
import { collection, getDocs} from "firebase/firestore";
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
const bookItems = ref<StoreItem[]>([]);



onBeforeMount(async () => {
  const booksCollection = collection(db, 'books'); // Change to the books collection
  const booksSnapshot = await getDocs(booksCollection);
  bookItems.value = booksSnapshot.docs.map(
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
.booksHeader {
  background-image: url('https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg'); 
}

.items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
  gap: 20px;
  margin: 20px;
  justify-content: center;
}
</style>
