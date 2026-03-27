# Frontend API Integration

The React frontend has been updated to connect with the backend API.

## Key Changes

1. **Axios Installation**: Added axios for API requests.

2. **API Utility**: Created `src/api/api.js` with functions for all API endpoints.

3. **Authentication**: Login form at `/login` with JWT token storage in localStorage.

4. **Data Fetching**: Replaced dummy data with API calls in Dashboard and WeeklyMenu.

5. **Booking**: Added booking functionality with success/error feedback.

6. **Loading States**: Added loading spinners and error handling.

## API Functions

- `registerUser(data)` - Register new user
- `loginUser(data)` - Login user
- `getMeals()` - Fetch all meals
- `bookMeal(data)` - Book a meal
- `getUserBookings()` - Get user's bookings
- `cancelBooking(id)` - Cancel a booking

## Usage Examples

### Login Form
```jsx
import { loginUser } from '../api/api';

const handleLogin = async () => {
  try {
    const response = await loginUser({ email, password });
    localStorage.setItem('token', response.token);
    // Redirect to dashboard
  } catch (error) {
    // Handle error
  }
};
```

### Fetch Meals
```jsx
import { useState, useEffect } from 'react';
import { getMeals } from '../api/api';

const [meals, setMeals] = useState([]);

useEffect(() => {
  const fetchMeals = async () => {
    try {
      const data = await getMeals();
      setMeals(data);
    } catch (error) {
      console.error('Failed to fetch meals');
    }
  };
  fetchMeals();
}, []);
```

### Book a Meal
```jsx
import { bookMeal } from '../api/api';

const handleBook = async (mealType) => {
  try {
    await bookMeal({ date: '2024-03-26', mealType });
    alert('Meal booked successfully!');
  } catch (error) {
    alert('Failed to book meal');
  }
};
```

## Running the Application

1. Start the backend server on port 5001
2. Start the frontend: `npm run dev`
3. Navigate to `/login` to authenticate
4. Use the dashboard to view and book meals

## Notes

- JWT tokens are automatically included in API requests via axios interceptors
- Error handling is implemented with user-friendly messages
- Loading states prevent multiple submissions
- CORS is handled by the backend