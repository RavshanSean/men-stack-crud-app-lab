const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require("method-override");//new
const morgan = require("morgan");//new

const app = express();



mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`);
});
const Anime = require('./models/anime.js');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new



app.get('/', async (req, res) => {
    res.render('index.ejs')
});

app.get("/animes", async (req, res) => {
    const allAnimes = await Anime.find();
    
    res.render("animes/index.ejs", { animes: allAnimes });
  });

app.get('/animes/new', (req, res) => {
    res.render('animes/new.ejs');
});

app.get("/animes/:animeId", async (req, res) => {
    const foundAnime = await Anime.findById(req.params.animeId);
    res.render('animes/show.ejs', { anime: foundAnime });
  });



//edit
app.put("/animes/:animeId", async (req, res) => {
    if (req.body.isReadyToWatch === "on") {
      req.body.isReadyToWatch = true;
    } else {
      req.body.isReadyToWatch = false;
    }
    await Anime.findByIdAndUpdate(req.params.animeId, req.body);
    res.redirect(`/animes/${req.params.animeId}`);
});


  app.get("/animes/:animeId/edit", async (req, res) => {
    const foundAnime = await Anime.findById(req.params.animeId);
    console.log(foundAnime);
    res.render('animes/edit.ejs', {
        anime: foundAnime, 
    });
  });

  app.put("/animes/:animeId", async (req, res) => {
    if (req.body.isReadyToWatch === "on") {
      req.body.isReadyToWatch = true;
    } else {
      req.body.isReadyToWatch = false;
    }
    await Anime.findByIdAndUpdate(req.params.animeId, req.body);
    res.redirect(`/animes/${req.params.animeId}`);
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

  app.delete("/animes/:animeId", async (req, res) => {
    await Anime.findByIdAndDelete(req.params.animeId);
    res.redirect('/animes');
  });

app.listen(3000, () => {
 console.log('Listening on port 3000')
});