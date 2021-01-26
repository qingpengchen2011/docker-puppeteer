const puppeteer = require('puppeteer')
 
async function printPDF() {
	  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
	  const page = await browser.newPage();
	  await page.goto('https://xueqiu.com/', {waitUntil: 'networkidle0'});
	  const pdf = await page.pdf({ format: 'A4',path: 'a.pdf' });
	  console.log("write a.pdf"); 
	  await browser.close();
	  return pdf
};


(async () => {
	    await printPDF();
})();


