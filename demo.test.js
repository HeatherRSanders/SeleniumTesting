
require('chromedriver');

const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

const BASE_URL = 'http://localhost:3000';

async function runTests() {
    const driver = await new Builder()
        .forBrowser('chrome')
        .build();

    try {
        // TEST 1: Open homepage and check title
        await driver.get(BASE_URL);
        await driver.sleep(2000);

        await driver.wait(until.titleIs('Home'), 5000);

        assert.strictEqual(
            await driver.getTitle(),
            'Home'
        );

        console.log('PASS: Homepage opens with title Home');


        // TEST 2: Open contact page and check title
        

// TEST 2: Open contact page and check title
const contactLink = await driver.findElement(By.id('contactLink'));

await driver.wait(until.elementIsVisible(contactLink), 5000);

await driver.executeScript(
    "arguments[0].scrollIntoView({block: 'center'});",
    contactLink
);

await contactLink.click();

await driver.wait(until.titleIs('Contact Us'), 5000);

assert.strictEqual(
    await driver.getTitle(),
    'Contact Us'
);

console.log('PASS: Contact page opens with title Contact Us');



        // TEST 3: Sign up for more information via email
        await driver.get(`${BASE_URL}/contact`);

        const email = 'test@example.com';

        await driver.findElement(By.id('formInput')).sendKeys(email);

        await driver.findElement(By.id('formSubmit')).click();

        const message = await driver.wait(
            until.elementLocated(By.id('formMessage')),
            5000
        );

        const actualMessage = await message.getText();

        assert.strictEqual(
            actualMessage,
            `More info coming to ${email}`
        );

        console.log('PASS: Email signup displays correct confirmation');

        console.log('\nAll 3 Selenium tests passed!');

    } finally {
        await driver.quit();
    }
}

runTests().catch(error => {
    console.error('TEST FAILURE:', error);
    process.exitCode = 1;
});
