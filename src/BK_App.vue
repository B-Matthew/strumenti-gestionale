<script setup>
import HelloWorld from './components/HelloWorld.vue';
import {onMounted} from 'vue';
import {db, auth} from './firebase/firebase';
import { collection, getDocs} from 'firebase/firestore';
import {createUserWithEmailAndPassword} from 'firebase/auth';

onMounted(async () => {
  try {
    // Test Firestore
    const snaphost = await getDocs(collection(db,'strumenti'));
    console.log('Dati strumenti:', snaphost.docs.map(doc => doc.data()));

    // Test Auth con mail finta
    const userCred = await createUserWithEmailAndPassword(auth, 'test@example.com', '123456');
    console.log('Utente creato:', userCred.user.email);
  } catch(error) {
    console.error('Errore Firebase:', error.message);
  }
});
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
