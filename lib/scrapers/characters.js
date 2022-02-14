const puppeteer = require('puppeteer');
const fs = require("fs")

const pages = [
  "Part_1", 
  "Part_2", 
  "Part_3", 
  "Part_4", 
  "Part_5", 
  "Part_6", 
  "Part_7", 
  "Part_8", 
  "Miscellaneous_Characters", 
  "Live_Action_Characters", 
  "Light_Novel_Characters", 
  "One-shot_Characters"
]

module.exports = async function() {
  const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  const allNames = [];
  for await (let category of pages) {
    await page.goto("https://jojowiki.com/Category:" + category)
    const names = await page.evaluate(`
    let elements = document.getElementsByClassName("charwhitelink");
    const names = [];
    for (let element of elements) {
      names.push(element.innerHTML);
    }
    names
    `)
    if (category == "Part_8") {
      names.push("Yoshikage Kira (JoJolion)")
      names.push("Josuke Higashikata (JoJolion)")
    }
    allNames.concat(names);
  }

  await browser.close();
  save(allNames)
}

function save(names = [""]) {
  fs.readFile("../data/characters.json", (err, data) => {
    if (err) throw err;
    data = JSON.parse(data.toString());
    data.names = names;
    fs.writeFile("../data/characters.json", JSON.stringify(data), () => {})
  })
}
