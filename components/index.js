import '../index.scss';
var Calculator = /** @class */ (function () {
    function Calculator() {
        this.data = {
            maxChars: 10,
            storedResult: null,
            currentValue: '0',
            currentOperation: null,
            mapKeys: {
                48: { type: 'input', value: '0' },
                49: { type: 'input', value: '1' },
                50: { type: 'input', value: '2' },
                51: { type: 'input', value: '3' },
                52: { type: 'input', value: '4' },
                53: { type: 'input', value: '5' },
                54: { type: 'input', value: '6' },
                55: { type: 'input', value: '7' },
                56: { type: 'input', value: '8' },
                57: { type: 'input', value: '9' },
                190: { type: 'input', value: '.' },
                88: { type: 'operation', value: 'exponent' },
                47: { type: 'operation', value: 'division' },
                221: { type: 'operation', value: 'multiply' },
                189: { type: 'operation', value: 'subtract' },
                187: { type: 'operation', value: 'sum' },
                67: { type: 'clear', value: 'clear' },
                13: { type: 'result', value: null },
                8: { type: 'delete', value: null },
                84: { type: 'toggle', value: 'toggle' }
            }
        };
        this.calDisplay = document.querySelector('.calculator-display');
        this.init();
    }
    Calculator.prototype.init = function () {
        this.updateView();
        this.bindKeyboard();
        this.bindButtons();
    };
    Calculator.prototype.updateView = function () {
        this.calDisplay.innerHTML = this.data.currentValue;
    };
    Calculator.prototype.bindKeyboard = function () {
        var _this = this;
        document.addEventListener('keydown', function (event) {
            var mapKeys = _this.data.mapKeys;
            var keyCode = event.keyCode;
            // binds shift + 7 to 'divide by'
            if (keyCode === 55 && event.shiftKey) {
                keyCode = 47;
            }
            if (mapKeys[keyCode]) {
                _this.processUserInput(mapKeys[keyCode]);
                _this.activateButtonWithKeypress(keyCode);
            }
        });
    };
    Calculator.prototype.bindButtons = function () {
        var _this = this;
        var buttons = document.querySelectorAll('.calculator button');
        var mapKeys = this.data.mapKeys;
        Array.from(buttons).forEach(function (button) {
            button.addEventListener('click', function (event) {
                _this.processUserInput(mapKeys[event.target.dataset.keycode]);
            });
        });
    };
    Calculator.prototype.activateButtonWithKeypress = function (keyCode) {
        var choseBtn = document.querySelector(".calculator button[data-keycode=\"" + keyCode + "\"]");
        if (choseBtn) {
            choseBtn.classList.toggle('active');
            setTimeout(function () {
                choseBtn.classList.toggle('active');
            }, 150);
        }
    };
    Calculator.prototype.setNumber = function (newNumber) {
        var currentValue = this.data.currentValue;
        if (newNumber === '.' && currentValue.includes('.')) {
            this.blinkDisplay();
            return;
        }
        if (currentValue.length === this.data.maxChars) {
            this.blinkDisplay();
            return;
        }
        if (currentValue === '0' && newNumber === '.') {
            currentValue = '0.';
        }
        else if (currentValue === '0' && newNumber !== '.') {
            this.blinkDisplay();
            currentValue = newNumber;
        }
        else {
            currentValue += newNumber;
        }
        this.data.currentValue = currentValue;
        this.updateView();
    };
    Calculator.prototype.blinkDisplay = function () {
        var _this = this;
        this.calDisplay.classList.toggle('blink');
        setTimeout(function () {
            _this.calDisplay.classList.toggle('blink');
        }, 150);
    };
    Calculator.prototype.processUserInput = function (userInput) {
        var type = userInput.type;
        switch (type) {
            case 'input':
                this.setNumber(userInput.value);
                break;
            case 'operation':
                this.setOperation(userInput.value);
                break;
            case 'delete':
                this.deleteNumber();
                break;
            case 'result':
                this.showResult();
                break;
            case 'clear':
                this.clearAll();
                break;
            case 'toggle':
                this.toggleNumber();
        }
    };
    Calculator.prototype.toggleNumber = function () {
        this.data.currentValue = (parseFloat(this.data.currentValue) * -1) + '';
        this.updateView();
    };
    Calculator.prototype.showResult = function () {
        if (this.data.storedResult !== null) {
            this.calculate();
            this.updateView();
            // if null "=" was pressed first
        }
        else {
            this.blinkDisplay();
        }
    };
    Calculator.prototype.deleteNumber = function () {
        var newValue = this.data.currentValue.slice(0, -1);
        if (newValue === '') {
            this.blinkDisplay();
            this.clearCurrentValue();
        }
        else {
            this.data.currentValue = newValue;
            this.updateView();
        }
    };
    Calculator.prototype.setOperation = function (newOperation) {
        if (this.data.currentOperation !== null && this.data.storedResult !== null) {
            this.calculate();
        }
        this.data.storedResult = this.data.currentValue;
        this.data.currentValue = '0';
        this.data.currentOperation = newOperation;
    };
    Calculator.prototype.calculate = function () {
        var oldValue = parseFloat(this.data.storedResult);
        var operation = this.data.currentOperation;
        var newValue = parseFloat(this.data.currentValue);
        var resultValue = 0;
        if (operation === 'multiply') {
            resultValue = oldValue * newValue;
        }
        if (operation === 'division') {
            if (newValue === 0) {
                alert('除数不能为0');
                this.data.storedResult = null;
                this.data.currentValue = '' + resultValue;
                this.updateView();
                return;
            }
            resultValue = oldValue / newValue;
        }
        if (operation === 'subtract') {
            resultValue = oldValue - newValue;
        }
        if (operation === 'sum') {
            var multiplierFix = 1000000000;
            // resultValue = oldValue + newValue;
            resultValue = (((oldValue * multiplierFix) + (newValue * multiplierFix)) / multiplierFix);
        }
        if (operation === 'exponent') {
            resultValue = Math.pow(oldValue, newValue);
        }
        this.data.storedResult = null;
        this.data.currentValue = '' + resultValue;
        this.updateView();
    };
    Calculator.prototype.clearAll = function () {
        this.data.currentOperation = null;
        this.data.storedResult = null;
        this.data.currentValue = '0';
        this.updateView();
    };
    Calculator.prototype.clearCurrentValue = function () {
        this.data.currentValue = '0';
        this.updateView();
    };
    return Calculator;
}());
var cal = new Calculator();
//# sourceMappingURL=index.js.map