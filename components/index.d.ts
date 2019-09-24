import '../index.scss';
export interface keys {
    type: string;
    value: string;
}
export interface mapKeys {
    [propName: string]: keys;
}
export interface Data {
    maxChars: number;
    storedResult: string;
    currentValue: string;
    currentOperation: string;
    mapKeys: mapKeys;
}
