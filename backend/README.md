# Hostel Meal Management Backend

This is the backend for the Hostel Meal Management System built with Node.js, Express.js, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or remote)

## Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/hostel-meal-management
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5001
   ```

## Running MongoDB

### Option 1: Local MongoDB
- Install MongoDB on your system
- Start MongoDB service:
  - macOS: `brew services start mongodb/brew/mongodb-community`
  - Linux: `sudo systemctl start mongod`
  - Windows: Start MongoDB service from Services panel

### Option 2: MongoDB Atlas (Cloud)
- Create account at https://www.mongodb.com/atlas
- Create a cluster and get connection string
- Update MONGO_URI in .env with your Atlas connection string

## Seeding Database

Run the seed script to populate the database with sample data:

```
npm run seed
```

This will:
- Clear existing data
- Create an admin user: `admin@gmail.com` / `123456`
- Add sample meals for Monday-Friday

## Starting the Server

### Development (with auto-restart):
```
npm run dev
```

### Production:
```
npm start
```

The server will run on `http://localhost:5001`.

## API Endpoints

### Test
- `GET /api/test` - Check if API is working

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Meals
- `GET /api/meals` - Get all meals
- `POST /api/meals` - Create a new meal (admin only)
- `PUT /api/meals/:id` - Update a meal (admin only)

### Bookings
- `POST /api/bookings` - Create a booking (authenticated user)
- `GET /api/bookings` - Get user's bookings (authenticated user)
- `GET /api/bookings/all` - Get all bookings (admin only)
- `DELETE /api/bookings/:id` - Delete a booking (user or admin)

## Testing the API

1. Start the server
2. Test the test endpoint:
   ```
   curl http://localhost:5001/api/test
   ```

3. Login as admin:
   ```
   curl -X POST http://localhost:5001/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@gmail.com","password":"123456"}'
   ```

4. Get meals:
   ```
   curl http://localhost:5001/api/meals
   ```

## Notes
- JWT tokens are required for authenticated routes. Include `Authorization: Bearer <token>` in headers.
- Admin role is required for certain operations.
- All responses are in JSON format.
- CORS is enabled for frontend integration.