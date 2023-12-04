<template>
  <header class="header">
    <router-link to="/">
      <img src="./assets/logo.png" alt="logo" />
    </router-link>
  </header>
  <nav class="nav">
    <router-link to="/" class="nav-item">Home</router-link>
    <router-link to="/books" class="nav-item">Books</router-link>
    <router-link to="/music" class="nav-item">Music</router-link>
    <router-link to="/kitchenware" class="nav-item">Kitchenware</router-link>
  </nav>
  <main class="main-content">
    <!-- <div v-for="(item, index) in items" :key="item.name" class="item"> -->
      <!-- Existing item display -->
      <router-view></router-view>
<!-- '      <button @click="confirmDeletion(item, index)">Delete</button>
      <button @click="enableEditMode(item)">Modify</button>
      <div v-if="isEditing && currentEditItem === item">' -->
        <!-- <input v-model="item.name" />
        <input v-model="item.description" />
        <input type="number" v-model.number="item.price" />
        <input type="number" v-model.number="item.rating" />
        <input type="number" v-model.number="item.stock" />
        <input v-model="item.image" /> -->
        <!-- <button @click="confirmUpdate(item)">Update</button>
        <button @click="cancelEdit">Cancel</button>
      </div> -->
    <!-- </div> -->
  </main>
  <footer class="footer">
    &copy; 2023 Tims Store. All rights reserved.
  </footer>
</template>

<script lang="ts" setup>
import "font-awesome/css/font-awesome.min.css";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./main.ts";
import { ref } from 'vue';

const items = ref([
  // Bücher
  {
    name: 'The Great Adventure',
    category: 'books',
    description: 'A thrilling journey through uncharted territories.',
    price: 15,
    rating: 4.5,
    stock: 50,
    image: 'https://m.media-amazon.com/images/M/MV5BOWE1YWVhNzUtNDI0ZC00OGYzLWIwOTMtYWE1MDIxNDZjMDViXkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_.jpg'
  },
  {
    name: 'History of Tomorrow',
    category: 'books',
    description: 'Exploring the future possibilities of humanity.',
    price: 20,
    rating: 4.8,
    stock: 40,
    image: 'https://m.media-amazon.com/images/I/71KBDP3mDfL._AC_UF1000,1000_QL80_.jpg'
  },
  // Musik
  {
    name: 'Melodies of the Night',
    category: 'music',
    description: 'A collection of soothing night-time tunes.',
    price: 10,
    rating: 4.3,
    stock: 70,
    image: 'https://i.icanvas.com/LEA46?d=2&sh=h&p=1&bg=g'
  },
  {
    name: 'Rhythms of Nature',
    category: 'music',
    description: 'Energizing tracks inspired by the natural world.',
    price: 12,
    rating: 4.6,
    stock: 60,
    image: "https://m.media-amazon.com/images/I/71HT4O3O6xL._AC_UF1000,1000_QL80_.jpg"
  },
  
  // Küchenutensilien
  {
    name: 'Chef\'s Knife Set',
    category: 'kitchenware',
    description: 'A set of professional-grade knives for kitchen enthusiasts.',
    price: 45,
    rating: 4.7,
    stock: 20,
    image: 'https://m.media-amazon.com/images/I/81h1L5+oc-L.jpg'
  },
  {
    name: 'Multipurpose Blender',
    category: 'kitchenware',
    description: 'Versatile blender for smoothies, soups, and more.',
    price: 30,
    rating: 4.4,
    stock: 35,
    image: 'https://m.media-amazon.com/images/I/71-cncz8iBS._AC_UF894,1000_QL80_.jpg'
  }
]);

// const isEditing = ref(false);
// const currentEditItem = ref(null);

// const confirmDeletion = async (item, index) => {
//   if (confirm(`Are you sure you want to delete ${item.name}?`)) {
//     await deleteItem(item, index);
//   }
// };

// const deleteItem = async (item, index) => {
//   const itemDoc = doc(db, item.category.toLowerCase(), item.id);
//   await deleteDoc(itemDoc);
//   items.value.splice(index, 1);
// };

// const enableEditMode = (item) => {
//   isEditing.value = true;
//   currentEditItem.value = item;
// };

// const confirmUpdate = async (item) => {
//   if (confirm(`Are you sure you want to update ${item.name}?`)) {
//     await updateItem(item);
//   }
// };

// const updateItem = async (item) => {
//   const itemDoc = doc(db, item.category.toLowerCase(), item.id);
//   await updateDoc(itemDoc, item);
//   isEditing.value = false;
//   currentEditItem.value = null;
// };

// const cancelEdit = () => {
//   isEditing.value = false;
//   currentEditItem.value = null;
// };
async function data_init() {
  const booksCollection = collection(db, "books");
  const querySnapshot = await getDocs(booksCollection);

  if (querySnapshot.size === 0) {
    items.value.forEach(async (item) => {
      const itemCollection = collection(db, item.category.toLowerCase());
      await addDoc(itemCollection, item);
    });

    console.log("Data initialized in Firestore.");
  } else {
    console.log("Firestore is not empty. Skipping data initialization.");
  }
}
data_init();
</script>


<style scoped>
.header {
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* You can adjust the height as needed */
}

.header a {
  text-decoration: none;
  cursor: pointer;
}

.header img {
  max-width: 100%; /* Ensure the logo doesn't exceed its container */
  max-height: 175px; /* Maintain aspect ratio */
}

.nav {
  background-color: #444;
  color: white;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.nav-item {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  min-width: 100px;
  padding: 10px 20px;
  margin: 5px;
  border: 1px solid #fff;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-item:hover {
  background-color: #fff;
  color: #444;
}
.main-content {
  background-color: #242424;
}

.footer {
  background-color: #333;
  color: white;
  padding: 10px;
}
</style>
