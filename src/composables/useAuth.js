import { ref } from "vue";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const user = ref(null);
const initialized = ref(false);

onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser;
  initialized.value = true;
});

export function useAuth() {
  return {
    user,
    initialized,
  };
}
