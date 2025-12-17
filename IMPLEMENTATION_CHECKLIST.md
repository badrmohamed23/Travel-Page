# Travel Page Application - Implementation Checklist

## ✅ All Components Properly Implemented

### 1. Users Login (Main Page)
**File:** `views/login.ejs`
- ✅ Username input field
- ✅ Password input field
- ✅ Login button
- ✅ Link to registration page for new users
- ✅ Backend validation in `app.js`:
  - ✅ Checks credentials against database
  - ✅ Redirects to home page on successful login
  - ✅ Displays error message for invalid credentials
- ✅ Session management implemented
- ✅ Root route `/` redirects to login

---

### 2. User Registration
**File:** `views/registration.ejs`
**Backend:** `app.js` - `/register` POST route
- ✅ Username input field
- ✅ Password input field
- ✅ Registration button
- ✅ Server-side validation:
  - ✅ Checks if username already exists in MongoDB
  - ✅ Displays error if username is taken
  - ✅ Requires both username and password
  - ✅ Specific error messages for each field
- ✅ Password hashing using bcrypt
- ✅ Redirects to login page on successful registration
- ✅ Success message displayed on login page after registration
- ✅ Data stored in MongoDB collection 'users'

---

### 3. Home Page
**File:** `views/home.ejs`
**Backend:** `app.js` - `/home` GET route
- ✅ Protected route (requires authentication)
- ✅ Welcome message
- ✅ Search bar (present on all pages except login/registration)
- ✅ Three destination categories displayed:
  - ✅ Hiking (button links to `/hiking`)
  - ✅ Cities (button links to `/cities`)
  - ✅ Islands (button links to `/islands`)
- ✅ "View Want-to-Go List" button (links to `/wanttogo`)
- ✅ Logout button in navbar
- ✅ Visual styling with background image

---

### 4. Category Pages

#### 4a. Hiking Category
**File:** `views/hiking.ejs`
- ✅ Displays two hiking destinations:
  - ✅ Inca Trail to Machu Picchu (clickable, links to `/inca`)
  - ✅ Annapurna Circuit (clickable, links to `/annapurna`)
- ✅ Search bar present
- ✅ Logout button in navbar

#### 4b. Cities Category
**File:** `views/cities.ejs`
- ✅ Displays two city destinations:
  - ✅ Paris (clickable, links to `/paris`)
  - ✅ Rome (clickable, links to `/rome`)
- ✅ Search bar present
- ✅ Logout button in navbar

#### 4c. Islands Category
**File:** `views/islands.ejs`
- ✅ Displays two island destinations:
  - ✅ Bali Island (clickable, links to `/bali`)
  - ✅ Santorini Island (clickable, links to `/santorini`)
- ✅ Search bar present
- ✅ Logout button in navbar

---

### 5. Destination Pages

All destination pages follow the same structure:

#### 5a. Paris (`views/paris.ejs`)
**Backend Route:** `app.js` - `/paris` GET route
- ✅ Title and navbar with destination name
- ✅ Destination image
- ✅ Description of Paris
- ✅ Embedded YouTube video (streaming, not stored locally)
- ✅ "Add to Want-to-Go List" button
- ✅ Form sends "Paris" to `/wanttogo/add`
- ✅ Success/Error message display
- ✅ Search bar present
- ✅ Logout button in navbar

#### 5b. Rome (`views/rome.ejs`)
- ✅ Title: "Rome"
- ✅ Destination name sent to backend: "Rome"
- ✅ All required components present
- ✅ YouTube video embedded

#### 5c. Bali Island (`views/bali.ejs`)
- ✅ Title: "Bali Island"
- ✅ Destination name sent to backend: "Bali Island"
- ✅ All required components present
- ✅ YouTube video embedded

#### 5d. Santorini Island (`views/santorini.ejs`)
- ✅ Title: "Santorini Island"
- ✅ Destination name sent to backend: "Santorini Island"
- ✅ All required components present
- ✅ YouTube video embedded

#### 5e. Inca Trail to Machu Picchu (`views/inca.ejs`)
- ✅ Title: "Inca Trail to Machu Picchu"
- ✅ Destination name sent to backend: "Inca Trail to Machu Picchu"
- ✅ All required components present
- ✅ YouTube video embedded

#### 5f. Annapurna Circuit (`views/annapurna.ejs`)
- ✅ Title: "Annapurna Circuit"
- ✅ Destination name sent to backend: "Annapurna Circuit"
- ✅ All required components present
- ✅ YouTube video embedded

**Backend Routes:** `app.js`
- ✅ `/inca`, `/annapurna`, `/paris`, `/rome`, `/bali`, `/santorini` - All GET routes
- ✅ All routes require authentication
- ✅ All routes pass msg/err query parameters for success/error messages

**"Add to Want-to-Go List" Button Functionality:**
- ✅ `app.post('/wanttogo/add')` route in `app.js`
- ✅ Prevents duplicate additions (checks if destination already in list)
- ✅ Displays error message if destination already exists
- ✅ Uses MongoDB `$addToSet` operator for duplicate prevention
- ✅ Redirects back to referrer page after adding
- ✅ Displays success message on redirect

---

### 6. Want-to-Go List Page
**File:** `views/wanttogo.ejs`
**Backend Route:** `app.js` - `/wanttogo` GET route
- ✅ Protected route (requires authentication)
- ✅ Displays user's username in heading
- ✅ Lists all destinations added by user
- ✅ Each destination displays with a "View" button
- ✅ Destination mapping correctly configured:
  ```javascript
  {
    "paris": "paris",
    "rome": "rome",
    "bali island": "bali",
    "santorini island": "santorini",
    "inca trail to machu picchu": "inca",
    "annapurna circuit": "annapurna"
  }
  ```
- ✅ "View" buttons link to correct destination pages
- ✅ Displays message when list is empty
- ✅ Search bar present
- ✅ Logout button in navbar
- ✅ Database integration: reads from MongoDB user document `wantToGo` array

---

### 7. Search Functionality
**File:** `views/searchresults.ejs`
**Backend Route:** `app.js` - `/search` POST route

**Search Behavior:**
- ✅ Search bar present on all pages except login and registration
- ✅ Case-insensitive search
- ✅ Searches destination names only
- ✅ Partial matching supported (e.g., "div" finds "Maldives" - wait, no Maldives currently, but "bali" finds "Bali Island")
- ✅ Displays search results as clickable links
- ✅ Each result links to destination page (via `/` prefix and destination URL)
- ✅ "Destination not Found" message displayed when no results match

**Searchable Destinations:**
- ✅ Paris
- ✅ Rome
- ✅ Bali Island
- ✅ Santorini Island
- ✅ Inca Trail to Machu Picchu
- ✅ Annapurna Circuit

**Backend Configuration (`app.js`):**
```javascript
const destinations = [
  { name: 'Paris', url: '/paris' },
  { name: 'Rome', url: '/rome' },
  { name: 'Bali Island', url: '/bali' },
  { name: 'Santorini Island', url: '/santorini' },
  { name: 'Inca Trail to Machu Picchu', url: '/inca' },
  { name: 'Annapurna Circuit', url: '/annapurna' }
];
```

**Name Consistency:** ✅ All destination names in search backend match exactly with:
- ✅ Names displayed in views (navbar titles and destination labels)
- ✅ Names sent to database when "Add to Want-to-Go List" button is clicked
- ✅ Names stored in MongoDB user documents
- ✅ Mapping in wanttogo.ejs for displaying destination links

---

### 8. Additional Features

- ✅ **Session Management:** Express-session configured
- ✅ **Authentication Middleware:** `ensureAuthenticated` function protects all pages except login/registration
- ✅ **Password Security:** Bcrypt hashing with salt rounds
- ✅ **Database:** MongoDB integration for user storage
- ✅ **Logout Functionality:** All pages have logout button in navbar
- ✅ **Error Handling:** Proper error messages throughout
- ✅ **Responsive Design:** Bootstrap CSS framework used
- ✅ **Static Files:** Images and other assets served from `/public` directory

---

## 🗄️ Database Schema

**MongoDB Collection: users**
```javascript
{
  _id: ObjectId,
  username: String (unique),
  password: String (hashed with bcrypt),
  wantToGo: [
    "Paris",
    "Bali Island",
    ...
  ]
}
```

---

## 🚀 How to Run

1. Ensure MongoDB is running on `mongodb://127.0.0.1:27017`
2. Install dependencies: `npm install`
3. Start server: `node myApp/app.js`
4. Access application: `http://localhost:3000`

---

## ✨ Testing Scenarios

### Scenario 1: New User Registration
1. Go to `http://localhost:3000` → redirects to login
2. Click "I dont have an account"
3. Enter username and password
4. Click Register
5. See success message on login page
6. Login with new credentials
7. Verify redirected to home page

### Scenario 2: Adding to Want-to-Go List
1. Login to account
2. From home, click any category (e.g., "Cities")
3. Click "View" on a destination (e.g., Paris)
4. Click "Add to Want-to-Go List"
5. See success message
6. Click "Add to Want-to-Go List" again for same destination
7. See error message about duplicate
8. Go back home, click "View Want-to-Go List"
9. See Paris in the list with "View" button

### Scenario 3: Search Functionality
1. From any page (except login/registration)
2. Enter search term in search bar (e.g., "bali")
3. Click Search
4. See "Bali Island" in results
5. Click on result
6. Verify redirected to Bali destination page

### Scenario 4: Logout
1. From any authenticated page
2. Click Logout button in navbar
3. Verify redirected to login page
4. Session destroyed

---

## ✅ All Requirements Met

This implementation fully satisfies all requirements specified in the Travel Page application specifications.
