const axios = require('axios').default
const cheerio = require('cheerio')

const thiVienUrl = "https://hvdic.thivien.net/whv/"


module.exports = class HanVietScraper {
    async lookup(kanji) {
        let kanjiUrl = encodeURI(thiVienUrl + kanji)
        let amHanViet = new Set()
        // let nghiaPhoThong = new Set()

        await axios.get(kanjiUrl)
            .then(response => {
                const $ = cheerio.load(response.data)
                $('.info .hvres-goto-link').each((index, element) => {
                    amHanViet.add($(element).text())
                })
            })
            .catch(error => {
                console.log(error)
            })

        return Array.from(amHanViet).join(', ')
    }

}

