# Urban-Company-Booking Management
## 📝 Introduction  

### **Task:**  
To build a **simplified, efficient, and user-friendly** system for managing bookings.  
The goal was to provide users with an **interface** to **easily book slots, review, and cancel bookings** in real time.  

### **Features:**  
- **Booking Page**:  
  - Allows users to **book slots** of different workers (Carpenters, Plumbers, Electricians, etc.).  
  - Updates slot availability **in real-time**.  

- **Review Booking Page**:  
  - Users can **review their daily bookings**.  
  - Allows users to **cancel bookings** when required.  
  - Slots are updated **instantly** when booked or canceled.  

---

## 🛠️ Technology Used  

| Component       | Technology Used |
|----------------|----------------|
| **Database**   | PostgreSQL (Workers, Slots, Reservations) |
| **Real-time Updates** | WebSockets |
| **Backend**    | Nest.js (RESTful APIs) |
| **Frontend**   | React.js (with react-bootstrap) |
| **API Calls**  | Axios |

---

## ⚠️ Constraints  

1. **Unavailable slots must NOT be displayed**.  
2. **Real-time updates** should be implemented for slot availability changes.  

---

## 🗄️ Database & API Design  

### **Database Design**  
- **Tables**:  
  - `worker`, `slot`, `reservation`  
- **Relationships**:  
  - **worker (M) : slot (M)**  
  - **slot (1) : reservation (1)**  
  - **worker (1) : reservation (M)**  

#### **Key Fields:**  
- **workers**: `id`, `name`, `specialization`  
- **slots**: `id`, `time`, `isBooked`, `worker_id`  
- **reservations**: `id`, `userName`, `slot_id`, `worker_id`  

### **API Endpoints**  
- `GET /workers` → Fetch all workers  
- `GET /reservation` → Fetch all reservations of a user  
- `POST /reservations` → Book a slot  
- `DELETE /reservations/{id}` → Cancel a booking  

---

## 📌 App Flow  

### **📅 Booking Process:**  
1. **User selects a worker**.  
2. **Selects desired slot**.  
3. **Enters name** (Authentication can be added later) → **Slot gets booked**.  

### **📖 Review Page:**  
- Displays **User Name, Slot Time, Worker Name, Specialization**.  
- Provides a **Cancel button** to remove bookings.  

---

## 💡 Special Considerations  

✔️ **Implemented backend in NestJS & database in PostgreSQL**.  
✔️ **Efficiently handled slot conflicts using WebSockets**.  
✔️ **Easy-to-use UI with dropdown selections**.  
✔️ **Defined relationships properly**:  
   - One **worker** has many **slots**.  
   - One **worker** can have multiple **reservations**.  
   - One **slot** can have only **one reservation**.  
   - Each reservation stores **both slot & worker** details for accurate retrieval.  

---

## 🚀 Conclusion  

This project ensures **seamless booking management** with **real-time updates** and an **efficient database structure**. Future improvements can include **authentication, notifications, and advanced filtering**.  

---
  
📌 **Developed by:** _Mayank Tandon_ 🎯  
