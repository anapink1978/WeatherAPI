import { test, expect } from '@playwright/test'
import  fileUtils from './utils/fileUtils'
import globalUtils from './utils/globalUtils'
import path from 'path'
import stateslUtils from './utils/statesUtils'

let apikey:string
let apiVersion:string
let projectPath:string 

test.describe('As a frequent flyer, I want to get a different type of weather information', () => {

    test.beforeAll(async () => {
        //Set timeout for this hook.
        test.setTimeout(60000)
        apikey = fileUtils.getValueFromDataJSon('key')
        apiVersion = fileUtils.getValueFromDataJSon('version')    
        projectPath = path.resolve()
    });    

    test.beforeEach(async () => {
        // Timeout for each test, includes test, hooks and fixtures
        test.setTimeout(120000)
    })

    test('Should get current weather data for multiple cities in the world, found by city ids', async ({ request, baseURL }) => {
        const citiesIds = fileUtils.getValueFromDataJSon('cities-ids')
        const url = `${baseURL}/`+apiVersion+`/current?cities=`+citiesIds+`&key=`+apikey 
        const _response = await request.get(url)
        expect(_response.ok()).toBeTruthy()
        expect(_response.status()).toBe(200)
        console.log("Current Data Response",await _response.json())
    })

    test('Should get current weather data for Sydney at specific Latitude and Longitude',async ({ request, baseURL }) => {
        const lat = fileUtils.getValueFromDataJSon('Latitude')
        const lon = fileUtils.getValueFromDataJSon('Longitude')
        const url = `${baseURL}/`+apiVersion+`/current?lat=`+lat+`&lon=`+lon+`&key=`+apikey 
        const _response = await request.get(url)
        expect(_response.ok()).toBeTruthy()
        expect(_response.status()).toBe(200)

        //An example of one of the response header verification
        expect(_response.headers()).toHaveProperty('content-encoding','gzip')
       
        //An example of body data response verification - checking correct key and correct expected value
        const body = await _response.json()
        const data = body['data'][0]
        expect(data).toHaveProperty('city_name')
        expect(data.city_name).toBe('Sydney')  
        console.log("Response",await _response.json());
    })

    test('Should find the current warmest capital city in Australia',async ({ request, baseURL }) => {
        const cityTemp=[]
        let _response
        let url,body,data
        
        const cities = ["Sydney","Brisbane","Melbourne","Adelaide","Canberra","Perth","Hobart","Darwin"]
        for (let i = 0; i < cities.length; i++) {
            url = `${baseURL}/`+apiVersion+`/current?city=`+cities[i]+`&country=AU&key=`+apikey 
             _response = await request.get(url)
            expect(_response.ok()).toBeTruthy()
            expect(_response.status()).toBe(200)

            //Found the temp for each capital city
            body = await _response.json()
            data = body['data'][0]

            //Verify that the 'temp'property exist in the response
            expect(data).toHaveProperty('temp')

            // Add the data for each api call into cityTemp JSON Type data.
            cityTemp.push({city:cities[i],temp:data.temp})
        }        
        console.log("City Temp: ",cityTemp)
        //Find the current warmest capital city in Australia
        const warmestCity= globalUtils.getMaxRecord(cityTemp,"temp")
        console.log("The current warmest capital city in Australia is ",warmestCity)
    })

     test('Should find the current coldest US State using a metadata input file',async ({ request, baseURL }) => {
        const stateTemp=[]
        let _response
        let url,body,data

        const csvFile = projectPath+'/tests-api/resources/states.csv'
        // convert states.csv file to States format
        const states = stateslUtils.getStatesJsonFromCSV(csvFile)

        //Filter only the states in US
         const usStates = stateslUtils.filterByCountryCode(states,'US')
         // Get all states name in array
         const statesName = stateslUtils.getStateNames(usStates)

         for (let i = 0; i < statesName.length; i++) {
             url = `${baseURL}/`+apiVersion+`/current?city=`+statesName[i]+`&country=US&key=`+apikey 
              _response = await request.get(url)
             expect(_response.ok()).toBeTruthy()
             expect(_response.status()).toBe(200)

             //Found the temp for each city 
             body = await _response.json()
             data = body['data'][0]

            //Verify that the 'temp'property exist in the response
             expect(data).toHaveProperty('temp')
            // Add the data for each api call into cityTemp JSON Type data.
            stateTemp.push({State:statesName[i],temp:data.temp})
         }        

         console.log("States Temp: ",stateTemp)
        //Find the current coldest State in US
        const coldestCity= globalUtils.getMinRecord(stateTemp,"temp")
        console.log("The current coldest State in US is ",coldestCity)
     })

    //Extra test (not within the AC requirement)    
    test('Should get Weather API usage summary', async ({ request, baseURL }) => {
        const url = `${baseURL}/`+apiVersion+`/subscription/usage?key=`+apikey
        const _response = await request.get(url)
        expect(_response.ok()).toBeTruthy()
        expect(_response.status()).toBe(200)
        console.log(await _response.json())
    })

    test.afterAll(async ({ request }) => {
        //Set timeout for this hook.
        test.setTimeout(60000)
        // Dispose all responses.
         await request.dispose();
    })
})