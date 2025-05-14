"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { io, Socket } from 'socket.io-client';
import { ChatUser } from '@/lib/userlist';

interface AuthContextType {
  user: User | null;
  userData: ChatUser | null;
  loading: boolean;
  socket: Socket | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  socket: null,
  userData: null
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<ChatUser | null>(null)
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) {
          const data = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            createdAt: serverTimestamp(),
            profilePicture: "",
            status:true
          }
          await setDoc(userRef, data);
          setUserData(data as ChatUser)
        } else {
          setUserData(snap.data() as ChatUser)
        }

        const newSocket = io("http://localhost:3000", {
          query: { uid: currentUser.uid },
        });
        setSocket(newSocket);
      } else {
        if (socket) {
          socket.disconnect();
          setSocket(null);
        }
      }

      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      if (socket) socket.disconnect();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, socket, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
