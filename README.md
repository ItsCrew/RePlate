# 🥗 Replate

**Replate** is a MERN-stack logistics platform designed to bridge the gap between local food donors and people in need. By utilizing real-time geospatial tracking and secure claiming workflows, Replate ensures that surplus food is redistributed efficiently rather than wasted.

---

## 🚀 Key Technical Features

- **📍 Hyper-Local Discovery:** Implemented **MongoDB 2dsphere indexing** and `$near` queries to provide users with a feed of food available within a 5km radius of their current GPS coordinates.
- **🔐 Secure Authentication:** Full user identity system using **JSON Web Tokens (JWT)** and **BcryptJS** for salted and hashed password storage.
- **⚡ Real-Time Inventory:** Integrated **Socket.io** to provide live updates of food quantities as items are claimed, ensuring "Claim" actions are reflected instantly across all connected clients.
- **⌛ Automated Expiration:** Intelligent query filtering ensures that food listings are automatically hidden from the public feed once the `pickupWindow` has expired.
- **🛡️ Concurrency Protection:** Atomic database updates prevent "double-claiming" of the same item during simultaneous requests.

---

## 🛠️ Tech Stack

| Layer         | Technology                            |
| :------------ | :------------------------------------ |
| **Frontend**  | JavaScript (ES6+), Axios, CSS3, HTML5 |
| **Backend**   | Node.js, Express.js                   |
| **Database**  | MongoDB Atlas, Mongoose ODM           |
| **Security**  | JWT (JSON Web Tokens), BcryptJS       |
| **Real-time** | Socket.io                             |

---

## 🧠 Technical Challenges & Solutions

### **1. The Geolocation "Loop Trap"**

- **Challenge:** Initial logic attempted to fetch coordinates inside a `forEach` render loop, causing the browser to trigger dozens of redundant hardware GPS requests simultaneously.
- **Solution:** Refactored the data-fetching logic to a "Pre-fetch Fork" pattern. The app now requests permission once at the top level, determines the correct API endpoint based on coordinates (Nearby vs. Global), and then executes a single Axios call.

### **2. Thread-Safe Claims**

- **Challenge:** Preventing "Race Conditions" where two users might claim the last remaining unit of food at the exact same millisecond.
- **Solution:** Leveraged Mongoose’s `$inc` operator paired with a filter condition `{ quantity: { $gt: 0 } }`. This makes the claim operation **atomic** at the database level, preventing negative inventory.

### **3. Silent Security via Middleware**

- **Challenge:** Manually hashing passwords in every controller made the code repetitive and prone to security oversights.
- **Solution:** Implemented **Mongoose Pre-Save Hooks**. This encapsulates the hashing logic within the User Schema, ensuring data is always encrypted before it touches the disk, regardless of which controller saves it.

---

## ⚙️ Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/crew.codes/replate.git](https://github.com/crew.codes/replate.git)
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables (.env):**

   ```text
   PORT=5000
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_custom_secret_key
   JWT_LIFETIME=30d
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

---

## 📸 Project Roadmap

- [x] Geospatial Filter Implementation
- [x] JWT Authentication & Protected Routes
- [x] Real-time Socket updates
- [ ] Donor Analytics Dashboard
- [ ] Email notifications for claims
