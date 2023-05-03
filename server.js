const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

//home-page

app.get('/', (req, res) => {
  res.render('home-page');
});

app.get('/beers', (req, res) => {
  const beerList = punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beersInfo: beersFromApi })
      console.log('Beers from the database: ', beersFromApi)
    })
    .catch(error => console.log(error));
});


app.get('/random-beer', (req, res) => {
  const randomBeer = punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('randombeer', { beersRandomInfo: responseFromAPI })
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
