
import csvToJson from 'convert-csv-to-json'

export default interface States {
    state_code: string,
    state_name:string,
    country_code:string
}

export default class stateslUtils {
 
    //Convert CSV file and generate it into Array of Object in JSON States Format
    public static getStatesJsonFromCSV(fileInputName:string):States[] {
        //The csv fields are delimiter by a comma 
        csvToJson.fieldDelimiter(',').getJsonFromCsv(fileInputName);
        // To be able to parse correctly fields wrapped in quote
        csvToJson.supportQuotedField(true).getJsonFromCsv(fileInputName);
        const arayObj = csvToJson.getJsonFromCsv(fileInputName)
        return arayObj
    }

    // This function is filtering the data by selected country_code 
    public static filterByCountryCode(dataArr:States[],filterValue:string):States[] {
        const filterData = dataArr.filter((value) => value.country_code == filterValue)
        return filterData
    }

    //Map all the states name from the input States[]
    public static getStateNames(states:States[]):string[] {
         const statesName = states.map(function(item) {return item.state_name})
         return statesName
    }
}