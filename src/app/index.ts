import '../index.scss';
export interface keys {
    type:string,
    value:string
}
export interface mapKeys{
    [propName:string]:keys
}
export interface Data{
    maxChars:number,
    storedResult:string,
    currentValue:string,
    currentOperation:string,
    mapKeys:mapKeys
}


 class Calculator{
    data:Data;
    calDisplay:HTMLElement;
    constructor(){
        this.data = {
            maxChars:10,
            storedResult:null,
            currentValue:'0',
            currentOperation:null,
            mapKeys:{ 
                48 : { type: 'input', value:  '0' },
                49 : { type: 'input', value:  '1' },
                50 : { type: 'input', value:  '2' },
                51 : { type: 'input', value:  '3' },
                52 : { type: 'input', value:  '4' },
                53 : { type: 'input', value:  '5' },
                54 : { type: 'input', value:  '6' },
                55 : { type: 'input', value:  '7' },
                56 : { type: 'input', value:  '8' },
                57 : { type: 'input', value:  '9' },
                190: { type: 'input', value:  '.' },
                88 : { type: 'operation', value:  'exponent' },
                47 : { type: 'operation', value:  'division' },
                221: { type: 'operation', value:  'multiply' },
                189: { type: 'operation', value:  'subtract' },
                187: { type: 'operation', value:  'sum' },
                67 : { type: 'clear', value:  'clear' },
                13 : { type: 'result', value:  null },
                8  : { type: 'delete', value:  null },
                84 : { type: 'toggle', value:  'toggle' }
            }
        };
        this.calDisplay = document.querySelector('.calculator-display');
        this.init();
    }
    init(){
        this.updateView();
        this.bindKeyboard();
        this.bindButtons();
    }
    updateView(){
        this.calDisplay.innerHTML = this.data.currentValue;
    }
    bindKeyboard(){
      document.addEventListener('keydown', event => {
          const mapKeys = this.data.mapKeys;
          let keyCode = event.keyCode;
          // binds shift + 7 to 'divide by'
          if (keyCode === 55 && event.shiftKey) {
            keyCode = 47;
          }
          if(mapKeys[keyCode]){
               this.processUserInput(mapKeys[keyCode]);
               this.activateButtonWithKeypress(keyCode);
          }
      });
    }
    bindButtons() {
        const buttons = document.querySelectorAll('.calculator button');
        const mapKeys = this.data.mapKeys;
        Array.from(buttons).forEach((button) => {
          button.addEventListener('click', (event) => {
            this.processUserInput(mapKeys[(<HTMLButtonElement> event.target).dataset.keycode])
          });
        });
    }
    activateButtonWithKeypress(keyCode:number){
      const choseBtn = document.querySelector(`.calculator button[data-keycode="${keyCode}"]`);
      if(choseBtn){
          choseBtn.classList.toggle('active');
          setTimeout(()=>{
              choseBtn.classList.toggle('active');
          },150)
      }
    }
    setNumber(newNumber:string){
        let currentValue = this.data.currentValue;
        if(newNumber === '.' && currentValue.includes('.')){
            this.blinkDisplay();
            return;
        }
        if(currentValue.length === this.data.maxChars){
            this.blinkDisplay();
            return;
        }
        if(currentValue === '0' && newNumber === '.'){
            currentValue = '0.'
        } else if(currentValue === '0' && newNumber !== '.'){
            this.blinkDisplay();
            currentValue = newNumber;
        } else{
            currentValue += newNumber;
        }
        this.data.currentValue = currentValue;
        this.updateView()
    }
    blinkDisplay(){
         this.calDisplay.classList.toggle('blink');
         setTimeout(()=>{
             this.calDisplay.classList.toggle('blink');
         },150)
    }
    processUserInput(userInput:keys){
        const type = userInput.type;
         switch(type){
             case 'input': 
                this.setNumber(userInput.value)
                break;
             case 'operation':
                this.setOperation(userInput.value)
                break;
             case 'delete':
                this.deleteNumber();
             case 'result': 
                this.showResult();
                break;
             case 'clear':
                this.clearAll();
                break;
             case 'toggle':
                this.toggleNumber();
         }
    }
    toggleNumber () {
        this.data.currentValue = (parseFloat(this.data.currentValue) * -1) + '';
        this.updateView();
    }
    showResult () {
        if (this.data.storedResult !== null) {
          this.calculate()
          this.updateView();
    
          // if null "=" was pressed first
        } else {
          this.blinkDisplay();
        }
    }
    deleteNumber(){
        const newValue = this.data.currentValue.slice(0, -1);
        if (newValue === '') {
          this.blinkDisplay();
          this.clearCurrentValue();
        } else {
          this.data.currentValue = newValue;
          this.updateView();
        }
    }
    setOperation(newOperation:string){
       if(this.data.currentOperation !== null &&this.data.storedResult !== null ) {
           this.calculate();
       }
       this.data.storedResult = this.data.currentValue;
       this.data.currentValue = '';
       this.data.currentOperation = newOperation;
    }
    calculate(){
        const oldValue  = parseFloat(this.data.storedResult);
        let operation = this.data.currentOperation;
        const newValue = parseFloat(this.data.currentValue);
        let  resultValue = 0;
        if ( operation === 'multiply') {
            resultValue = oldValue * newValue;
          }
          if ( operation === 'division') {
            resultValue = oldValue / newValue;
          }
          if ( operation === 'subtract') {
            resultValue = oldValue - newValue;
          }
          if ( operation === 'sum') {
            const multiplierFix = 1000000000;
            // resultValue = oldValue + newValue;
            resultValue = (((oldValue * multiplierFix) + (newValue * multiplierFix)) / multiplierFix)
          }
          if ( operation === 'exponent') {
            resultValue = Math.pow(oldValue, newValue);
          }
          this.data.storedResult = null;
          this.data.currentValue = '' + resultValue;
          this.updateView();
    }
    clearAll () {
        this.data.currentOperation = null;
        this.data.storedResult = null;
        this.data.currentValue = '0';
        this.updateView();
    }
    clearCurrentValue () {
        this.data.currentValue = '0';
        this.updateView();
    }
 }
 let cal = new Calculator()
 console.dir(cal)

