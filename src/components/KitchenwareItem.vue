<template>
    <div class="groceries-item">
      <div class="image-wrapper">
        <img :src="isEditing ? editableItem.image : item.image" :alt="item.name" />
      </div>
      <div class="info-wrapper" v-if="!isEditing">
        <p>
          <b>{{ item.name }}: </b>{{ item.description }}<br />
          <span v-for="n in 5" :key="n">
            <i class="fa" :class="['fa-star', n <= item.rating ? '' : 'fa-star-o']"></i>
          </span>
        </p>
        <p>${{ item.price.toFixed(2) }}<br />{{ item.stock }} in stock.</p>
        <button @click="enableEditMode">Modify</button>
        <button @click="confirmDeletion">Delete</button>
      </div>
      <div class="info-wrapper" v-else>
        <!-- Editable fields -->
        <input v-model="editableItem.name" placeholder="Name" />
        <textarea v-model="editableItem.description" placeholder="Description"></textarea>
        <input type="number" v-model.number="editableItem.price" placeholder="Price" />
        <input type="number" v-model.number="editableItem.rating" placeholder="Rating" />
        <input type="number" v-model.number="editableItem.stock" placeholder="Stock" />
        <input v-model="editableItem.image" placeholder="Image URL" />
        <button @click="confirmUpdate">Update</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </template>
  
  
  <script lang="ts" setup>
import { ref, defineProps } from 'vue';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../main.ts";

const props = defineProps(["item"]);
const isEditing = ref(false);
const editableItem = ref({ ...props.item });

const enableEditMode = () => {
  isEditing.value = true;
  editableItem.value = { ...props.item };
};

const confirmDeletion = async () => {
  if (window.confirm(`Are you sure you want to delete ${props.item.name}?`)) {
    await deleteDoc(doc(db, 'books', props.item.id));
    // Event emission to parent component for further handling
  }
};

const confirmUpdate = async () => {
  if (window.confirm(`Are you sure you want to update ${props.item.name}?`)) {
    await updateDoc(doc(db, 'books', props.item.id), editableItem.value);
    isEditing.value = false;
  }
};

const cancelEdit = () => {
  isEditing.value = false;
};
</script>
  
  <style scoped>
  .groceries-item {
    border: 1px solid #ccc;
    padding: 20px;
    text-align: left;
    display: flex;
    flex-direction: column;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .groceries-item:hover {
    border-color: #ff9900;
    box-shadow: 0 0 10px rgba(255, 140, 0, 0.5);
  }
  
  .image-wrapper {
    width: 100%;
    padding-top: 100%;
    position: relative;
    overflow: hidden;
  }
  
  .groceries-item img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  .info-wrapper {
    color: white;
  }
  </style>
  