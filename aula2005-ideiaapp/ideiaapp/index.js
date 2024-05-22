const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

const app = express();

const conn = require("./db/conn");

// Models
const Ideia = require("./models/Ideia");

// routes
const IdeiasRoutes = require("./routes/IdeiaRoutes");
const authRoutes = require("./routes/authRoutes");
const ToughController = require("./controllers/IdeiaController");
const IdeiaController = require("./controllers/IdeiaController");

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//session middleware
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  }),
)

app.use(flash());

app.use(express.static("public"));

app.use((req, res, next) => {
  console.log(req.session.userid);

  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});

app.use("/Ideias", IdeiasRoutes);
app.use("/", authRoutes);

app.get("/", IdeiaController.showIdeias);

conn
  .sync(),
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));