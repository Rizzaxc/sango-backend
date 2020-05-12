const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3000

let corsOptions = {
    origin: 'https://rizzaxc-sango.herokuapp.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://rizzaxc:mR3^5nAV6B^Hu9S7@sango-arjgd.mongodb.net/test?retryWrites=true&w=majority"

const nihongo = require('nihongo') // Japanese text checker

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }))


const JishoApi = require('unofficial-jisho-api')
const jisho = new JishoApi()
let HanVietScraper = require('./han-viet-scraper')
let hvScraper = new HanVietScraper()


const QUERY_TYPE = {
    KANJI: 1,
    MEANING: 2,
    READING: 3,
    ERROR: -1
}


function getQueryType(query) {
    let l = query.length
    let rLatin = /^[A-Za-z]+$/
    // If the query length is 1 and is Kanji
    if (l == 1 && nihongo.isKanji(query)) {
        return QUERY_TYPE.KANJI
    }
    
    // If the query length is > 1 and in Latin
    if (l > 1 && query.match(rLatin)) {
        return QUERY_TYPE.MEANING
    }
    // If the query length is > 1 and in Japanese
    if (l > 1 && nihongo.isJapanese(query)) {
        return QUERY_TYPE.READING
    }
    // Else error
    return QUERY_TYPE.ERROR
}

app.get('/search/:query', (req, res) => {
    query = req.params.query
    let queryType = getQueryType(query)
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(async err => {
        const collection = client.db("Sango").collection("Kanji")
        let $filter = {}
        let $projection = {_id: 0}
        switch (queryType) {
            case QUERY_TYPE.KANJI:
                $filter = {Writing: query}
                break
            case QUERY_TYPE.MEANING:
                $filter = {Meaning: query}
                break
            case QUERY_TYPE.READING:
                $filter = {$or: [{Onyomi: query}, {Kunyomi: query}]}
                break
            case QUERY_TYPE.ERROR:
                console.log('Query type error: ' + query)
                client.close()
                return -1
            default:
                client.close()
                return -1
        }
        let results = await collection.find($filter).project($projection).toArray()
        results = JSON.stringify(results)
        console.log(queryType, results)
        client.close()
        res.send(results)
    })

})



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