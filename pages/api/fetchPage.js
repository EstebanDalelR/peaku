import request from 'request'
import cheerio from 'cheerio'

export default (req, res) => {
  let url = req.body.url
  console.log(`called ${req.body.url}`)

  request(url, function (error, response, html) {
    console.log('requested')
    if (error) res.send({ error: 'Error fetchin URL' })
    console.log('loaded HTML')
    let $ = cheerio.load(html)
    let title
    console.log($('h1').text())
    title = $('h1').text()
    console.log(title)
    res.send({ title: title || req.body.url })
  })
}
