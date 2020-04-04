const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 8000

let corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }))


const JishoApi = require('unofficial-jisho-api')
const jisho = new JishoApi()
let HanVietScraper = require('./han-viet-scraper')
let hvScraper = new HanVietScraper()


app.get('/jisho/:kanji', (req, res) => {

    kanji = req.params.kanji
    jishoBundle = {
        onyomi: Array,
        kunyomi: Array,
        meaning: Array,
        writing: String
    }

    jisho.searchForKanji(kanji).then(result => {
        jishoBundle.kunyomi = result.kunyomi
        jishoBundle.onyomi = result.onyomi
        jishoBundle.meaning = result.meaning.split(', ')
        jishoBundle.writing = kanji
        
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