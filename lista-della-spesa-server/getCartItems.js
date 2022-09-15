

const puppeteer = require('puppeteer');
const url = 'https://primenow.amazon.it/signin';
const ordersUrl = 'https://primenow.amazon.it/yourOrders';

const getItemsFromCart = async (userMail,userPass,orderDate) =>{
  try { 
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(url,{ waitUntil: 'load', timeout: 0 });
  
    //let html = await page.content();
    //console.log(html); 
  
   /*  //postcode
    await page.evaluate(() => {
      try { 
        let postalCodeField = document.querySelector("[name='lsPostalCode'");
        postalCodeField.value = "10121"
      }
      catch (error){
        console.log(error)
      } 
    }) */

    /* //home
    await page.click('input[type="submit"]')
    await page.waitForNavigation()
    await page.evaluate(() => {
      try { 
        let menu1 = document.querySelector("[data-reactid='68']");
        let menu2 = document.querySelector("[data-reactid='69']");
        menu1.style.display = 'block'
        menu2.style.opacity = 1
      }
      catch (error){
        console.log(error)
      } 
    })
    await page.click('.page_header_drop_menu_sign_in__signIn__zNI9h')
    //await page.waitForNavigation({ waitUntil: 'load'})
    await page.waitForNavigation({ waitUntil: 'load'})
 */
  
    
   await page.evaluate(() => {
    try { 
        let emailField = document.querySelector("#ap_email");
        let passwordField = document.querySelector("#ap_password");
        emailField.value = 'm.tavarelli@hotmail.com';
        passwordField.value =  'mrbaloon91';
      }
      catch(error){
        throw new Error(error)
      }
    }); 
  
    await page.click('input#signInSubmit')
   /*  await page.waitForNavigation()
    await page.evaluate(()=> document.querySelector("#ap_password").value = 'mrbaloon91') 
    await page.click('input#signInSubmit')
    */

    await page.waitForNavigation()
    await page.goto(ordersUrl);
    //await page.click('a.page_header_cart_button__cart')
  
    let orderId = await page.evaluate(()=> {
      let tables = document.getElementsByTagName("table");

      for(let table of tables){
        let date = table.querySelector("span.a-color-base.a-text-bold").innerText;
        if(date === '23 mar 2021'){
          let button = table.querySelector("a.a-button-text");
          return button.id
        }
      }
    })

    page.click(`a#${orderId}`).then(async() => {
    
      await page.waitForNavigation({waitUntil: 'load'})
      let html = await page.content();
      console.log(html)
      await browser.close()
      return html;
        /* let ordersData = await page.evaluate(()=> {
          try{
            let products = document.querySelectorAll("div.a-box");
            let productsData = [];
        
            alert(products);
            products.forEach(product=>{
              let title = product.querySelector("span.a-size-base-plus.a-color-base").innerText;
              let price = product.querySelector("span.a-size-base-plus.a-color-base.a-text-bold.a-nowrap").innerText;
              let quantitySpan = product.querySelector("span.a-size-base-plus.a-color-base.a-text-caps.a-nowrap").innerText;
              let quantityText =quantitySpan.split('Quantità:')[0];
              let quantity = quantityText.split(' ')[0];
              let siglePrice = quantityText.split(' ')[quantityText.split(' ').length - 2];
              let imgSrc = products.getElementsByTagName('img').src
              productsData.push({
                title:title,
                imgSrc:imgSrc,
                siglePrice:+siglePrice,
                price:+price.split('€')[0].trim(),
                quantity:+quantity,
              })
            });
            //console.log(ordersData)
            return(productsData);
          }
          catch(error){
            return error
          }
          //return(JSON.stringify(html));
        }) 
        */
    });

   // let html = await page.content();

    //ordine

    //alert( JSON.stringify(productsData))
    
  }
  catch(error){
    console.log(error)
    return error
  }
}


module.exports.getItemsFromCart = getItemsFromCart;
