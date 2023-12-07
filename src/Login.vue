<template>
    <div class="login-container">
      <h1>Login</h1>
  
      <input type="email" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="Password">
  
      <button @click="signIn">Sign In</button>
      <button @click="signUp">Sign Up</button>
  
      <label>
        <input type="checkbox" v-model="sendVerificationEmail">
        Send Verification Email
      </label>
  
      <button @click="resetPassword">Reset Password</button>
  
      <button @click="signInWithGoogle">Login with Google</button>
      <button @click="signInWithGitHub">Login with GitHub</button>
    </div>
  </template>
  
  <script>
  import { signInWithGoogle, signInWithGitHub, signIn, signUp, sendVerification, resetUserPassword } from './firebase/auth';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        sendVerificationEmail: false
      };
    },
    methods: {
      async signIn() {
        try {
          await signIn(this.email, this.password);
          if (this.sendVerificationEmail) {
            await sendVerification();
          }
          this.$router.push('/');
        } catch (error) {
          console.error(error);
        }
      },
      async signUp() {
        try {
          await signUp(this.email, this.password);
          if (this.sendVerificationEmail) {
            await sendVerification();
          }
          this.$router.push('/');
        } catch (error) {
          console.error(error);
        }
      },
      async resetPassword() {
        try {
          await resetUserPassword(this.email);
          alert("Password reset email sent.");
        } catch (error) {
          console.error(error);
        }
      },
      async signInWithGoogle() {
        try {
          await signInWithGoogle();
          this.$router.push('/');
        } catch (error) {
          console.error(error);
        }
      },
      async signInWithGitHub() {
        try {
          await signInWithGitHub();
          this.$router.push('/');
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    width: 100%;           /* Set the width of the login container */
    margin: 0 auto;         /* Center the container on the page */
    padding: 20px;          /* Add some padding inside the container */
    background-color: #f3f3f3; /* Light grey background */
    border-radius: 8px;     /* Rounded corners */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
    font-family: Arial, sans-serif; /* Set a default font */
    text-align: center;     /*Center the text inside the container*/
  }  
  </style>
  