const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: 'superdupersecret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("images"));

app.use(require("./controllers/"));

// Route to display static src images
app.get("/static", (req, res) => {
  res.render("static");
});

// Route to display dynamic src images
app.get("/dynamic", (req, res) => {
  imageList = [];
  imageList.push({ src: "images/logo.png", name: "logo" });
  res.render("dynamic", { imageList: imageList });
})

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening at http://localhost:${PORT}`)
  );
});
