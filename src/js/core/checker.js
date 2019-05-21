const Toolkit = require('./toolkit');

// 检查数据解决方案

function checkArray(array) {
    const length = array.length;
    let marks = new Array(length);
    marks.fill(true);
    for(let i = 0; i< length - 1; i++) {
        if(!marks[i]){
            continue;
        }

        let v= array[i];
        if(!v) {
            marks[i] = false;
            continue;
        }

        for (let j = i + 1; j < length; j++) {
            if (v === array[j]) {
                marks[i] = marks[j] = false;
            }
        }
    }
    return marks;
}

class Checker {
    constructor(matrix) {
        this._matrix = matrix;
        this._matrixMarks = Toolkit.matrix.makeMatrix(true);
    }

    get matrix(){
        return this._matrix;
    }

    get matrixMarks(){
        return this._matrixMarks;
    }

    get isSuccess(){
        return this.result;
    }

    check() {
        this.checkRows();
        this.checkCols();
        this.checkBoxes();

        // Array.prototype.every()

        this.result = this._matrixMarks.every(row => row.every(mark => mark))
        return this.result;
    }

    checkRows(){
        for (let rowIndex = 0; rowIndex <9; rowIndex++) {
            let row = this._matrix[rowIndex];
            let marks = checkArray(row);

            for (let colIndex = 0; colIndex < 9; colIndex++) {
                if(!marks[colIndex]){
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }

    checkCols() {
        for(let colIndex =0; colIndex < 9; colIndex++) {
            let cols = [];
            for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
                cols[rowIndex] = this._matrix[rowIndex][colIndex];
            }

            let marks = checkArray(cols);

            for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
                if(!marks[rowIndex]){
                    this._matrixMarks[rowIndex][colIndex] = false
                }
            }
        }
    }

    checkBoxes() {
        for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
            let boxes = Toolkit.box.getBoxCells(matrix, boxIndex)
            let marks = checkArray(boxes);

            for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
                if(!marks[cellIndex]) {
                    let {rowIndex, colIndex} = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex);
                    this._matrixMarks[rowIndex][colIndex] = false
                }
            }
        }
    }
}
