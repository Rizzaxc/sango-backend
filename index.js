const JishoApi = require('unofficial-jisho-api');
const jisho = new JishoApi();
let HanVietScraper = require('./han-viet-scraper')
let scraper = new HanVietScraper()


kanji = '安'

console.log(kanji)

scraper.lookup(kanji).then(amHanViet => {
  console.log('Am Han Viet: ' + amHanViet)
})

jisho.searchForKanji(kanji).then(result => {
  console.log('Meaning: ' + result.meaning)
  console.log('Onyomi: ' + result.onyomi)
  console.log('Kunyomi: ' + result.kunyomi)
})

