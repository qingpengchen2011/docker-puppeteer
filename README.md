# puppeteer docker image

docker image with  [Google Puppeteer](https://github.com/GoogleChrome/puppeteer) installed


## before usage


1. you should pass `--no-sandbox, --disable-setuid-sandbox` args when launch browser

```js
const puppeteer = require('puppeteer');

(async() => {

    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });

    const page = await browser.newPage();

    await page.goto('https://www.google.com/', {waitUntil: 'networkidle2'});

    browser.close();

})();
```

2. if you got page crash with `BUS_ADRERR` ([chromium issue](https://bugs.chromium.org/p/chromium/issues/detail?id=571394)), increase shm-size on docker run with `--shm-size` argument

```bash
docker run --shm-size 1G --rm -v <path_to_script>:/app/index.js alekzonder/puppeteer:latest
```

3. If you're seeing random navigation errors (unreachable url) it's likely due to ipv6 being enabled in docker. Navigation errors are caused by ERR_NETWORK_CHANGED (-21) in chromium. Disable ipv6 in your container using `--sysctl net.ipv6.conf.all.disable_ipv6=1` to fix:
```bash
docker run --shm-size 1G --sysctl net.ipv6.conf.all.disable_ipv6=1 --rm -v <path_to_script>:/app/index.js alekzonder/puppeteer:latest
```

4. add `--enable-logging` for chrome debug logging http://www.chromium.org/for-testers/enable-logging

```js
const puppeteer = require('puppeteer');

(async() => {

    const browser = await puppeteer.launch({args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',

        // debug logging
        '--enable-logging', '--v=1'
    ]});


```


## usage

### mount your script to /app/index.js

```bash
docker run --shm-size 1G --rm -v <path_to_script>:/app/index.js alekzonder/puppeteer:latest
```

### custom script from dir

```bash
docker run --shm-size 1G --rm \
 -v <path_to_dir>:/app \
 alekzonder/puppeteer:latest \
 node my_script.js
```