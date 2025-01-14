const { devices } = require('@playwright/test');

const config = {
    testDir: './tests',
    timeout: 30 * 1000,
    expect: {
        timeout: 5000
    },
    reporter: 'html',
    projects: [
        {
            name: 'safari',
            use: {
                browserName: 'webkit',
                headless: false,
                screenshot: 'off',
                trace: 'on',
                ...devices['iPhone 15 Pro'],
            }
        },
        {
            name: 'chrome',
            use: {
                browserName: 'chromium',
                headless: false,
                screenshot: 'on',
                video: 'retain-on-failure',
                trace: 'on',
                viewport : {width:720, height:720}
            }

        }
    ],

};

module.exports = config;