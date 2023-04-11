
import data from '../resources/data.json'

export default class fileUtils {

public static getValueFromDataJSon(keyName:string): any {
    return data[keyName]
  }

  
}