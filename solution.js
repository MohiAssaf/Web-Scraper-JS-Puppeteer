const puppeteer = require('puppeteer')

async function scrapeProduct(url){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const [Name] = await page.$x('/html/body/div[4]/div/form/div[2]/div[1]/main/div/div[3]/div[1]/div[1]/h1')  // simple reusable code to scrape any data only by the Xpath
    const text = await Name.getProperty('textContent')
    const name = await text.jsonValue()

    const [Price] = await page.$x('//*[@id="app"]/main/div/div[3]/div[1]/div[2]/span[4]') 
    const pricetxt = await Price.getProperty('textContent')
    const price = await pricetxt.jsonValue()

    const [Color] = await page.$x('//*[@id="99"]/img[2]')
    const colortxt = await Color.getProperty('alt')
    const color = await colortxt.jsonValue()

    const size = await page.$$eval("span.size-unavailable ", el => el.map(x => x.getAttribute("data-size"))); 

    setTimeout(() => { browser.close(); }, 10000);
    
    console.log({
        name, 
        price,
        color,
        size
    })



}

scrapeProduct('https://shop.mango.com/gb/women/skirts-midi/midi-satin-skirt_17042020.html?c=99')