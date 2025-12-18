# 🌍 Travel Page

A simple travel inspiration web app built with Node.js, Express, EJS, and MongoDB. Users can register, log in, browse destinations by category, search trips, and maintain a personal "Want to Go" list. ✈️🏝️🏔️

---

## ✨ Features

- 👤 User registration and login with hashed passwords (bcrypt)
- 🔐 Session-based authentication (express-session)
- 🗺️ Destination pages: hiking, cities, islands, and detailed trip views
- 🔎 Keyword search across featured trips
- 📌 Personal "Want to Go" list stored per user in MongoDB

---

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **View Engine:** EJS
- **Database:** MongoDB (collection: `myCollection` in DB `myDB` by default)
- **Auth:** bcrypt + express-session

---

## 🚀 Getting Started

### 1. 📥 Clone the repository

```bash
git clone https://github.com/badrmohamed23/Travel-Page.git
cd Travel-Page/myApp
```

### 2. 📦 Install dependencies

```bash
npm install
```

### 3. 🗄️ Set up MongoDB

- Make sure MongoDB is running locally, or have a MongoDB URI ready.
- By default the app uses:
  - URL: `mongodb://127.0.0.1:27017`
  - Database: `myDB`
  - Collection: `myCollection`

You can override these with environment variables:

```bash
set MONGO_URL=mongodb://127.0.0.1:27017
set DB_NAME=myDB
set PORT=3000
```

(Use `export` instead of `set` on macOS/Linux.)

### 4. ▶️ Run the app

From the `myApp` directory:

```bash
npm start
# or
node app.js
```

Then open your browser at:

```text
http://localhost:3000
```

---

## 📚 Usage

- 📝 Register a new account via `/registration`.
- 🔑 Log in via `/login` (default redirect from `/`).
- 🏠 After login, you land on the home page (`/home`).
- 🧭 Explore destinations:
  - `/hiking`, `/cities`, `/islands`
  - Detail pages like `/paris`, `/rome`, `/bali`, `/santorini`, `/inca`, `/annapurna`.
- 🔎 Use the search form to find a destination (renders `searchresults`).
- 📌 On destination pages, add places to your "Want to Go" list.
- 📋 View your list at `/wanttogo`.
- 🚪 Log out via `/logout`.

---

## 📂 Project Structure

```text
Travel-Page/
├─ COMPONENT_VERIFICATION_REPORT.md
├─ IMPLEMENTATION_CHECKLIST.md
├─ myApp/
   ├─ app.js              # Main Express app
   ├─ package.json        # Node dependencies & scripts
   └─ public/             # Static assets
   └─ views/              # EJS templates (pages, partials)
```

Key views include:

- `login.ejs`, `registration.ejs`, `home.ejs`
- Category pages: `hiking.ejs`, `cities.ejs`, `islands.ejs`
- Destination pages: `paris.ejs`, `rome.ejs`, `bali.ejs`, `santorini.ejs`, `inca.ejs`, `annapurna.ejs`
- `wanttogo.ejs`, `searchresults.ejs`

---

## 🔐 Authentication Notes

- Passwords are hashed using bcrypt before being stored.
- Sessions are managed using `express-session` with a configurable secret.
- Protected routes (home, destination pages, want-to-go list) use an `ensureAuthenticated` middleware.

---

## 🤝 Contributing

Pull requests and suggestions are welcome! 💡

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## 📧 Support

If you run into issues, please open an issue on GitHub or share logs/errors so they can be investigated. 🛟
