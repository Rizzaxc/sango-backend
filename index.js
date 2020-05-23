const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3000

let corsOptions = {
    origin: ['https://rizzaxc-sango.herokuapp.com', 'http://localhost:8080'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://rizzaxc:mR3^5nAV6B^Hu9S7@sango-arjgd.mongodb.net/test?retryWrites=true&w=majority"

const wanakana = require('wanakana') // 
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }))


const JishoApi = require('unofficial-jisho-api')
const jisho = new JishoApi()
let HanVietScraper = require('./han-viet-scraper')
let hvScraper = new HanVietScraper()


const MAXIMUM_RESULTS_RETURNED = 7

function isVietnamese(word) {
    const vnCharacters = 'aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆ fFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTu UùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ'


    for (let i = 0; i < word.length; i++) {
        let c = word.charAt(i)
        if (!vnCharacters.includes(c)) {
            return false
        }
    }

    return true
}

function buildPatternForKunyomi(query) {
    /** Build the regex pattern for kunyomi
        It must start with the starting kana
        May have a dot inbetween 2 kanas
        May not end with the last kana **/
    let pattern =　'^'
    for (let i = 0; i < query.length; i++) {
        pattern += query.charAt(i) + '.?'
    }

    return pattern
}


function getFilter(query) {
    let l = query.length
    let rLatin = /^[A-Za-z]+$/
    let $filter = -1
    // If the query length is 1 and is Kanji
    if (l == 1 && wanakana.isKanji(query)) {
        $filter = {Writing: query}
    }

    // If the query length is > 1 and in Latin
    // Search both meaning and han-viet since this can't detect no-sign vietnamese text
    // Search kun/ on using converted query
    else if (l > 1 && query.match(rLatin)) {
        let $meaning = {Meaning: query}
        let $AmHanViet = {AmHanViet: query}
        let $on = {Onyomi: wanakana.toKatakana(query)}
        let pattern = buildPatternForKunyomi(wanakana.toHiragana(query))
        let $kun = {Kunyomi: {$regex: `${pattern}`}}

        $filter = {$or: [$meaning, $AmHanViet, $on, $kun]}
    }

    // If the query is in signed Vietnamese
    else if (isVietnamese(query)) {
        $filter = {AmHanViet: query}
    }
    
    // If the query length is between 1-10 and in Japanese
    else if (l > 1 && l < 10 && wanakana.isJapanese(query)) {
        // Convert the japanese text to Katakana to search Onyomi
        let $on = {Onyomi: wanakana.toKatakana(query)}

        // Build a regex pattern for Kunyomi
        let pattern = buildPatternForKunyomi(query)

        let $kun = {Kunyomi: {$regex: `${pattern}`}}
        $filter = {$or: [$on, $kun]}
    }
    return $filter
}

app.get('/search/:query', (req, res) => {
    query = req.params.query
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(async err => {
        const collection = client.db("Sango").collection("Kanji")
        let $filter = getFilter(query)
        let $projection = {_id: 0}

        // If the query is invalid
        if ($filter == -1) {
            client.close()
            res.status(400).send('Error: Bad query')
        }
        let results = await collection.find($filter).project($projection).limit(MAXIMUM_RESULTS_RETURNED).toArray()
        results = JSON.stringify(results)
        client.close()
        res.send(results)
        
    })

})



// app.get('/jisho/:kanji', (req, res) => {

//     kanji = req.params.kanji
//     jishoBundle = {
//         onyomi: Array,
//         kunyomi: Array,
//         meaning: Array,
//         writing: String
//     }

//     jisho.searchForKanji(kanji).then(result => {
//         jishoBundle.kunyomi = result.kunyomi
//         jishoBundle.onyomi = result.onyomi
//         jishoBundle.meaning = result.meaning.split(', ')
//         jishoBundle.writing = kanji
        
//         res.send(jishoBundle)
//     }).catch(error => {
//         console.log(error)
//     })

// })

// app.get('/han-viet/:kanji', (req, res) => {
//     kanji = req.params.kanji

//     hvScraper.lookup(kanji).then(result => {
//         res.send({amHanViet: result})
//     }).catch(error => {
//         console.log(error)
//     })
// })



app.listen(port, () => console.log(`Backend listening on port ${port}!`))