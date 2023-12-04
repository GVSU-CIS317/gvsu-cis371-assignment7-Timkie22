<template>
    <!-- Your login form here -->
    <button @click="signInWithGoogle">Login with Google</button>
    <button @click="signInWithGitHub">Login with GitHub</button>
    <!-- Other buttons and fields -->
  </template>
  
  <script>
  import { signInWithGoogle, signInWithGitHub } from './firebase/auth';
  
  export default {
    methods: {
      async signInWithGoogle() {
        try {
          await signInWithGoogle();
          // Redirect to home
        } catch (error) {
          console.error(error);
        }
      },
      async signInWithGitHub() {
        try {
          await signInWithGitHub();
          // Redirect to home
        } catch (error) {
          console.error(error);
        }
      },
      // Other methods
    },
  };
  </script>
  