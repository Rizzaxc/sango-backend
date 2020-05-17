const axios = require('axios').default
const cheerio = require('cheerio')


const JishoApi = require('unofficial-jisho-api')
const jisho = new JishoApi()
let HanVietScraper = require('./han-viet-scraper')
let hvScraper = new HanVietScraper()

const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://rizzaxc:mR3^5nAV6B^Hu9S7@sango-arjgd.mongodb.net/test?retryWrites=true&w=majority"

const fs = require('fs')


scrapeUrl = "https://www.wanikani.com/kanji?difficulty="
allDiff = [
    {'Name' :'pleasant', 'StartLevel': 1},
    {'Name' :'painful', 'StartLevel': 11},
    {'Name' :'death', 'StartLevel': 21},
    {'Name' :'hell', 'StartLevel': 31},
    {'Name' :'paradise', 'StartLevel': 41},
    {'Name' :'reality', 'StartLevel': 51},
]


let allKanjis = []
for (let i = 1; i <= 60; i++) {
    allKanjis.push({'Level': i, 'Kanjis': []})
}

async function scrape(url, startLevel) {
    await axios.get(url)
        .then(response => {
            const $ = cheerio.load(response.data)                    
            for (let i = startLevel; i < (startLevel+10); i++) {
                $(`#level-${i} .single-character-grid .character`).each((index, kanji) => {
                    allKanjis[i-1].Kanjis.push($(kanji).text().trim())
                })
            }

        })
        .catch(error => {  
            console.log(error)
            return false
        })
    return true
}


async function main() {

    // // Get all the kanjis from WaniKani
    // for (const difficulty of allDiff) {
    //     let url = encodeURI(scrapeUrl + difficulty.Name)
    //     await scrape(url, difficulty.StartLevel)
    // }

    // restructured = []

    // allKanjis.forEach(element => {
    //     let level = element.Level
    //     let kanjis = element.Kanjis
    //     kanjis.forEach(kanji => {
    //         restructured.push({Level: level, Writing: kanji})
    //     });
    // });

    // // Write to a json file
    // let json = JSON.stringify(restructured)
    // fs.writeFile('All-WaniKani-Kanji.json', json, 'utf8', (err) => {
    //     console.log(err);
    // });

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    // Build the database
    await client.connect(err => {
        const collection = client.db("Sango").collection("Kanji");
        // Add entries to each Kanji

        let start = 46
        let end = 50
        let $ = {Level: {$gte: start, $lte: end}}
        collection.find($, (err, results) => {
            if (err) throw err;
            results.forEach(kanji => {
                let writing = kanji.Writing
                hvScraper.lookup(writing).then(amHanViet => {
                    jisho.searchForKanji(writing).then(jishoData => {
                        let $filter = {Writing: writing}
                        let $update = { $set: { 
                            Kunyomi: jishoData.kunyomi,
                            Onyomi: jishoData.onyomi,
                            Meaning: jishoData.meaning.split(', '),
                            AmHanViet: amHanViet
                            }
                        }
                        
                        collection.updateOne($filter, $update, (err, res) => {
                            if (err) throw err;
                            console.log(`${writing} updated`)

                        })
                    }).catch(error => {
                        console.log(`${writing} not updated`)
                        console.log(error)
                    })
                }).catch(error => {
                    console.log(`${writing} not updated`)
                    console.log(error)
                })
            })
        })
    })
    await client.close()

}

main()




