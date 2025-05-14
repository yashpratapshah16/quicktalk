import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

try {
  const credentials =JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  admin.initializeApp({
    credential: admin.credential.cert(credentials),
  });
  console.log("✅ Firebase Admin Initialized");
} catch (e) {
  console.error("❌ Failed to initialize Firebase Admin SDK:", e);
}
const db = admin.firestore();


const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    const uid = socket.handshake.query.uid;

    updateStatus(uid, true);

    console.log("User connected:", uid);

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      console.log(`${uid} joined room: ${roomId}`);
    });

    socket.on("private-message", ({ id,senderId, receiverId, text, roomId,timestamp,time,status }) => {
      // console.log(`Message from ${senderId} to ${receiverId}: ${text}`);
      io.to(roomId).emit("message", { id,senderId, receiverId, text, roomId,timestamp,time,status });
    });

    socket.on("disconnect", () => {
      updateStatus(uid, false);
      console.log("User disconnected:", uid);
    });
  });

  httpServer.once("error", (err) => {
    console.error(err);
    process.exit(1);
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});

const updateStatus = async (uid, status) => {
  const userRef = db.collection("users").doc(uid);
  try {
    console.log(`🔄 Updating status for ${uid} to ${status}`);
    await userRef.update({
      status: status,
      lastSeen: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log("✅ Status update successful for:", uid);
  } catch (e) {
    console.error("❌ Failed to update status for", uid, e.message);
  }
};
