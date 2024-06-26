const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`);
});
const Anime = require('./models/anime.js');

app.use(express.urlencoded({ extended: false }));


app.get('/', async (req, res) => {
    res.render('index.ejs')
});

app.get("/animes", async (req, res) => {
    const allAnimes = await Anime.find();
    console.log(allAnimes);
    res.render("animes/index.ejs", { animes: allAnimes });
  });

app.get('/animes/new', (req, res) => {
    res.render('animes/new.ejs');
});


app.post("/animes", async (req, res) => {
    if (req.body.isReadyToWatch === "on") {
        req.body.isReadyToWatch = true;
      } else {
        req.body.isReadyToWatch = false;
      }
      await Anime.create(req.body);
    res.redirect("/animes");
  });


app.listen(3000, () => {
 console.log('Listening on port 3000')
});