
# QuickTalk

A real-time chat application built with modern full-stack technologies for seamless one-to-one communication. Designed with performance, responsiveness, and scalability in mind, **QuickTalk** offers a lightweight, intuitive, and real-time messaging experience. Deployed on Vercel with Firebase integration and media handling via Cloudinary.

---


## 🚀 Tech Stack

* **[Next.js](https://nextjs.org/)** – Full-stack React framework for building both frontend and backend logic.
* **[TailwindCSS](https://tailwindcss.com/)** – Utility-first CSS framework for rapid custom styling.
* **[Lucide-React](https://lucide.dev/)** – Icon system for consistent and modern SVG icons.
* **[React-Hot-Toast](https://react-hot-toast.com/)** – Toast notifications for real-time feedback.
* **[Bolt.new](https://bolt.new/)** – UI design tool for generating fast, clean, developer-friendly components.
* **[Firebase](https://firebase.google.com/)** – Backend-as-a-Service for authentication and real-time data storage.
* **[Cloudinary](https://cloudinary.com/)** – Media storage and delivery for profile images and media attachments.
* **[Socket.IO](https://socket.io/)** – Enables real-time, bidirectional communication for quick message transfer.
* **[GitHub](https://github.com/yashpratapshah16/quicktalk)** – Source code and version control.

---

## 💡 Features

* 🔒 Firebase Authentication with Google sign-in.
* 📩 One-to-one real-time messaging.
* ⚡ Socket.IO for low-latency, real-time message transfer.
* 📷 Cloudinary-powered image upload and preview.
* 🔔 Toast notifications for events (e.g., login success, errors).
* 📱 Fully responsive UI optimized for all screen sizes.
* 🎨 Custom UI components designed via Bolt.new.
* 🧠 Code enhancements powered with ChatGPT for better architecture.

---

## 🛠️ Usage

```bash
# Clone the repository
git clone https://github.com/yashpratapshah16/quicktalk.git

# Navigate to the project directory
cd quicktalk

# Install dependencies
npm install

# Create environment variables
cp .env.example .env.local

# Run the development server
npm run dev

# Visit
http://localhost:3000
```

---

## 🔐 Environment Variables

You must create a `.env.local` file to store sensitive keys:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_MEASUREMENT_ID=your_measurement_id
FIREBASE_SERVICE_ACCOUNT=your_service_account_json
```

---

## 🧠 Applicability

QuickTalk serves as an excellent learning project and starting point for:

* Real-time chat applications with Firebase and Socket.IO backend.
* Media handling using Cloudinary.
* Combining authentication and database features in a full-stack app.
* Designing modern UI with TailwindCSS + Bolt.new.
* Implementing state handling and event-based logic using modern React tools.

---

## 🙌 Credits

* **Bolt.new** – UI generation.
* **Lucide-React** – Icon system.
* **ChatGPT** – Assisted with code logic refinement and structure.
* **GitHub** – Hosting and version control.
* **Firebase + Cloudinary** – Core backend and media support.
* **Socket.IO** – Real-time event communication.
* **Shadcn & Aceternity UI** - For prebuild UI components

---

## 📂 Project Structure

```
/components       -> Shared React components
/pages            -> Next.js pages (routes)
/styles           -> Tailwind and global styles
/utils            -> Firebase config and helper logic
/public           -> Static assets
/lib              -> Upload & media handling functions
```

---

## 📝 License

### MIT License

```
MIT License

Copyright (c) 2025 YASHPRATAP SHAH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

---

# OUTPUT

![Image](https://github.com/user-attachments/assets/66b9752f-39cb-413f-8219-1bffc8632c17)


![Image](https://github.com/user-attachments/assets/6a8ea27d-a8dc-4cb6-80c0-a2a1bb4fe5be)