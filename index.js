const puppeteer = require("puppeteer");

checkStock = async () => {
  const timestamp = Math.floor(+new Date() / 1000);
  const browser = await puppeteer.launch();
  const player = require("play-sound")((opts = {}));

  console.log("Checking stock");

  const page = await browser.newPage();

  await page.goto(
    "https://www.emag.ro/consola-playstation-5-so-9396406/pd/DNKW72MBM/?ref_id=540413278"
  );

  //   await page.goto(
  //     "https://www.emag.ro/consola-sony-playstation-4-pro-neo-1tb-negru-ps4pro1tb/pd/DVKHF2BBM/?X-Search-Id=f05a8b3a7cdb53ffe78e&X-Product-Id=46919802&X-Search-Page=1&X-Search-Position=0&X-Section=search&X-MB=0&X-Search-Action=view"
  //   );

  const outOfStock = await page.evaluate(
    () =>
      document.documentElement.getElementsByClassName("label-out_of_stock")
        .length
  );

  const playAlertSound = () =>
    player.play("alert.mp3", function (err) {
      if (err) throw err;
    });

  console.log("stock:", outOfStock);
  if (outOfStock) {
    console.log("Product Not In Stock");
  } else {
    console.log("Product In Stock");

    setInterval(playAlertSound, 5000);
  }

  //   await page.screenshot({ path: `${timestamp}-screen.png` });

  await browser.close();
};

setInterval(checkStock, 10000);
