import express from "express";
import ViteExpress from "vite-express";
import axios from 'axios'
import * as cheerio from 'cheerio';
const app = express();

//ViteExpress.config({ mode: "production" })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/check', (req, res) => {
  const name = req.query.name
  const sendName = name.split(' ').join('_')
  axios.get(`https://en.wikipedia.org/wiki/${sendName}`)
    .then(({ data }) => {
      const $ = cheerio.load(data)
      if ($('th.infobox-label')) {
        const test = $('th.infobox-label').map((_, each) => {
          const $each = $(each);
          if ($each.text() === 'Family' ||
            $each.text() === 'Relatives' ||
            $each.text() === 'Parents') {
            const row = $each.siblings('.infobox-data')
            return row.children().text()
          } else {
            return
          }
        }).toArray()
        !!test.length ? res.send(true) : res.send(false)
      }
    }).catch(() => res.send(null))
});



ViteExpress.listen(app, 3000, () => console.log("Server is listening at http://localhost:3000..."));
