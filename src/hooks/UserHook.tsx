import { onAuthStateChanged, User } from "@firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
  return user;
}
