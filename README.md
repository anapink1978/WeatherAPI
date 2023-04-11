# WEATHER API

## **Overview:**
Playwright tool is used to test the REST API of the weather application.
APIRequestContext class is used - it allows the test to make API calls and create asserations for various asspects of the HTTP response.
Playwright’s built-in request function is used, which is an instance of APIRequestContext.

## **Benefit of this framework **
This Framework can be used for Frontend testing (UI) or/and API testing.
This framework can be handy in cases of:
    * Testing the server API
    * Prepareing server side state before visiting the web application in a test
    * Validate server side post-conditions after running some actions in the browser

## **Supported Browsers** (If we want to integrate the Weather api tests with UI tests)
1. Chrome - default browser
2. Firefox
3. MS Edge
4. WebKit - web browser engine used by Safari

##  Installation
Playwright framework requires [Node.js](https://nodejs.org/) v14+ to run.
Installing the dependencies.
```sh
npm init playwright@latest
```
## Add dependency to your project
```sh
npm install playwright
``` 

## Test creation
- Create Test scenario with extension spec.ts. 
- UI test: add tests inside the folder tests
- API tests: add tests inside the folder tests-api (example - weatherApi.spec.ts under /tests-api/)

### Execution
Running all tests
```sh
npx playwright test 
or 
npm run test
```

Running a single test file (example running weatherApi test)
```sh
npm run weather
or
npx playwright test weatherApi.spec.ts
```

### Verify code is clean
Use linters before committing/pushing the code to the remote. Make use of the scripts
```sh
npm run lint
npm run lin-and-fix
```

### display HTML report 
```sh
npm run html-report
```

## Reports HTML/JSON (This framework can support other reports as well - This need to be configured)
Playwright HTML report will be present inside
```sh
artifacts/test-results/html-report/index.html
```
Playwright json report will be present inside
```sh
artifacts/test-results/json-report/results.json
```
