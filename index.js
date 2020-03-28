const JishoApi = require('unofficial-jisho-api');
const jisho = new JishoApi();
let HanVietScraper = require('./han-viet-scraper')
let scraper = new HanVietScraper()

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Kanji to search? ', (kanji) => {

  scraper.lookup(kanji).then(amHanViet => {
    console.log('Am Han Viet: ' + amHanViet)
  })
  
  jisho.searchForKanji(kanji).then(result => {
    console.log('Meaning: ' + result.meaning)
    console.log('Onyomi: ' + result.onyomi)
    console.log('Kunyomi: ' + result.kunyomi)
  })

  rl.close()
  
})



