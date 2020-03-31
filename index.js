const express = require('express')
const app = express()
const port = 8000

const JishoApi = require('unofficial-jisho-api')
const jisho = new JishoApi()
let HanVietScraper = require('./han-viet-scraper')
let hvScraper = new HanVietScraper()


app.get('/jisho/:kanji', (req, res) => {

    kanji = req.params.kanji
    jishoBundle = {
        onyomi: String,
        kunyomi: String,
        meaning: String
    }

    jisho.searchForKanji(kanji).then(result => {
        jishoBundle.kunyomi = Array(result.kunyomi).toString()
        jishoBundle.onyomi = Array(result.onyomi).toString()
        jishoBundle.meaning = result.meaning

        res.send(jishoBundle)
    }).catch(error => {
        console.log(error)
    })

})

app.get('/han-viet/:kanji', (req, res) => {
    kanji = req.params.kanji

    hvScraper.lookup(kanji).then(result => {
        res.send({amHanViet: result})
    }).catch(error => {
        console.log(error)
    })
})



app.listen(port, () => console.log(`Backend listening on port ${port}!`))