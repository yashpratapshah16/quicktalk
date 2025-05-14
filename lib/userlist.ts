import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export interface ChatUser {
  uid: string;
  displayName: string;
  profilePicture: string;
  email: string;
  status:boolean
}

export const subscribeToUserList = (
  uid: string,
  callback: (users: ChatUser[]) => void
) => {
  const usersRef = collection(db, "users");

  const q = query(usersRef, where("uid", "!=", uid));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const users: ChatUser[] = snapshot.docs.map(
      (doc) => doc.data() as ChatUser
    );
    callback(users);
  });

  return unsubscribe;
};
