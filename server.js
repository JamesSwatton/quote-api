const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = {
        quote: getRandomElement(quotes)
    };    
    res.status(200).send(randomQuote);
})

app.get('/api/quotes', (req, res, next) => {
    const personToFind = req.query.person;
    const quotesByPerson = quotes.filter(quote => {
        return quote.person === personToFind;
    })
    if (personToFind) {
        res.status(200).send({quotes: quotesByPerson});
    } else if (req.query.person === '') {
        res.status(200).send({quotes: []});
    } else {
        res.send({quotes});
    }
})

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});
