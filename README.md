# Delivery Management Platform

A full-stack delivery management platform built using React, Django REST Framework, PostgreSQL, JWT Authentication, Razorpay, and WebSockets.

---

## Features

### Customer

- User Registration & Login
- Create Delivery Requests
- Online Payment using Razorpay
- Track Delivery Status
- Real-Time Delivery Tracking

### Driver

- Driver Login
- View Assigned Deliveries
- Accept Deliveries
- Send Live Location Updates

### Admin

- Dashboard
- Manage Users
- Manage Deliveries
- Assign Drivers
- Update Delivery Status
- Manage Payments

---

## Tech Stack

### Frontend

- React
- React Router
- Axios
- Tailwind CSS

### Backend

- Django
- Django REST Framework
- JWT Authentication
- Django Channels (WebSockets)

### Database

- PostgreSQL

### Payments

- Razorpay

---

## Project Structure

```text
delivery-management-platform/

├── backend/
│   ├── apps/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── README.md
└── .gitignore

Installation-Backend:-

cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Installation-Frontend:-
cd frontend
npm install
npm run dev