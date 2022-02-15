const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
  res.status(404).end();
});

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

module.exports = router;
