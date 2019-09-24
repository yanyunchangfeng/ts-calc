import '../index.scss';
export interface Data{
    maxChars:number,
    storedResult:number,
    currentValue:string,
    currentOperation:string
}
export interface keys{
     type:string,
     value:string
}
export interface mapKeys{
    [propName:number]:keys
}
 class Calculator{
    data:Data;
    mapKeys:mapKeys;
    
 }

