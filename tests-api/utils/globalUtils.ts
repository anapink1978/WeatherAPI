export default class globalUtils {
  
    public static getMaxRecord(dataArr:string[],prop:string) {
        let max;
        for (let i=0 ; i<dataArr.length ; i++) {
            if (max == null || parseInt(dataArr[i][prop]) > parseInt(max[prop]))
                max = dataArr[i];
        }
        return max;
    }

    public static getMinRecord(dataArr:string[],prop:string) {
        let min;
        for (let i=0 ; i<dataArr.length ; i++) {
            if (min == null || parseInt(dataArr[i][prop]) < parseInt(min[prop]))
                min = dataArr[i];
        }
        return min;
    }
} 