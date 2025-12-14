const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { MongoClient } = require('mongodb');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'change_this_secret',
  resave: false,
  saveUninitialized: false,
}));

// MongoDB setup
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017';
const DB_NAME = process.env.DB_NAME || 'myDB';
let usersCol = null; // will be set after connection

function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.redirect('/login');
}

app.get('/', (req, res) => res.redirect('/login'));

app.get('/login', (req, res) => {
  const msg = req.query.msg || null;
  res.render('login', { error: null, msg });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('login', { error: 'Invalid username or password.' });
  }

  try {
    const user = await usersCol.findOne({ username });

    if (!user) {
      return res.render('login', { error: 'Invalid username or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render('login', { error: 'Invalid username or password.' });
    }

    req.session.user = user;
    res.redirect('/home');
  } catch (error) {
    console.error(error);
    res.render('login', { error: 'An error occurred during login.' });
  }
});

app.get('/registration', (req, res) => {
  res.render('registration', { error: null });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('registration', { error: 'Invalid username or password.' });
  }

  try {
    const user = await usersCol.findOne({ username });

    if (user) {
      return res.render('registration', { error: 'Invalid username or password.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await usersCol.insertOne({
      username,
      password: hashedPassword,
    });

    res.redirect('/login?msg=Registration+successful');
  } catch (error) {
    console.error(error);
    res.render('registration', { error: 'An error occurred during registration.' });
  }
});

app.get('/home', ensureAuthenticated, (req, res) => {
  res.render('home', { user: req.session.user });
});

// Category pages
app.get('/hiking', ensureAuthenticated, (req, res) => res.render('hiking'));
app.get('/cities', ensureAuthenticated, (req, res) => res.render('cities'));
app.get('/islands', ensureAuthenticated, (req, res) => res.render('islands'));

// Destination detail pages
app.get('/inca', ensureAuthenticated, (req, res) => res.render('inca', { msg: req.query.msg || null, err: req.query.err || null }));
app.get('/annapurna', ensureAuthenticated, (req, res) => res.render('annapurna', { msg: req.query.msg || null, err: req.query.err || null }));
app.get('/paris', ensureAuthenticated, (req, res) => res.render('paris', { msg: req.query.msg || null, err: req.query.err || null }));
app.get('/rome', ensureAuthenticated, (req, res) => res.render('rome', { msg: req.query.msg || null, err: req.query.err || null }));
app.get('/bali', ensureAuthenticated, (req, res) => res.render('bali', { msg: req.query.msg || null, err: req.query.err || null }));
app.get('/santorini', ensureAuthenticated, (req, res) => res.render('santorini', { msg: req.query.msg || null, err: req.query.err || null }));

app.post('/search', ensureAuthenticated, (req, res) => {
  const term = (req.body.Search || '').toLowerCase();
  const destinations = [
    { name: 'Paris', url: '/paris' },
    { name: 'Rome', url: '/rome' },
    { name: 'Bali', url: '/bali' },
    { name: 'Santorini', url: '/santorini' },
    { name: 'Inca Trail', url: '/inca' },
    { name: 'Annapurna Circuit', url: '/annapurna' }
  ];
  const results = destinations.filter(dest => dest.name.toLowerCase().includes(term));
  res.render('searchresults', { term, results });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

async function startServer() {
  const PORT = process.env.PORT || 3000;
  try {
    console.log(`Connecting to MongoDB: ${MONGO_URL} | DB: ${DB_NAME}`);
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db(DB_NAME);
    usersCol = db.collection('users');
    console.log('Successfully connected to MongoDB.');

    app.get('/wanttogo', ensureAuthenticated, async (req, res) => {
      try {
        const user = await usersCol.findOne({ username: req.session.user.username });
        if (!user) {
          return res.status(404).send('User not found');
        }
        res.render('wanttogo', { user: user.username, wantToGo: user.wantToGo || [] });
      } catch (e) {
        console.error('Failed to fetch want-to-go list', e);
        res.status(500).send('Error fetching want-to-go list');
      }
    });

    app.post('/wanttogo/add', ensureAuthenticated, async (req, res) => {
      const { destination } = req.body;
      const { username } = req.session.user;

      if (!destination) {
        return res.redirect('back');
      }

      try {
        const user = await usersCol.findOne({ username });

        if (user && user.wantToGo && user.wantToGo.includes(destination)) {
          const backURL = req.header('Referer') || '/';
          return res.redirect(`${backURL}?err=Destination+already+in+your+list.`);
        }

        await usersCol.updateOne(
          { username },
          { $addToSet: { wantToGo: destination } }
        );

        const backURL = req.header('Referer') || '/';
        res.redirect(`${backURL}?msg=Successfully+added+to+your+list.`);

      } catch (error) {
        console.error('Error adding to want-to-go list:', error);
        const backURL = req.header('Referer') || '/';
        res.redirect(`${backURL}?err=An+error+occurred.`);
      }
    });

    // ensure unique username
    await usersCol.createIndex({ username: 1 }, { unique: true });
    console.log('User index created.');

    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to connect to MongoDB and start server.');
    if (err.message) console.error('Error message:', err.message);
    if (err.reason) console.error('Reason:', err.reason); // For driver-specific errors
    process.exit(1); // Exit the process with an error code
  }
}

startServer();

module.exports = app;
