const matrixToolkit = {
    makeRow(v = 0) {
        let array = new Array(9);
        array.fill(v)
        return array
    },

    makeMatrix(v = 0) {
        return Array.from({length: 9}, () => this.makeRow(v))
    },

    /**
     * Fisher-Yates 洗牌算法
     * @param array
     */
    shuffle(array) {
        let endIndex = array.length - 2
        for (let i = 0; i <= endIndex; i++) {
            let j = i + Math.floor(Math.random() * (array.length - i));
            [array[i], array[j]] = [array[j], array[i]]
        }
        return array
    },
    checkFillable(matrix, n, rowIndex, colIndex) {
        const row = matrix[rowIndex]
        const column = this.makeRow().map((v,i) => matrix[i][colIndex])
        const {boxIndex} = boxToolkit.convertToBoxIndex(rowIndex, colIndex);
        const box = boxToolkit.getBoxCells(matrix, boxIndex)
        for (let i =0; i < 9; i++){
            if(row[i] === n || column[i] === n || box[i] === n){
                return false
            }
        }
        return true
    }
}

const boxToolkit = {
    // TODO
    convertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        }
    },
    convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        }
    },
    getBoxCells(matrix, boxIndex) {
        const startRowIndex = Math.floor(boxIndex / 3) * 3;
        const startColIndex = boxIndex % 3 * 3
        let result = []
        for (let cellIndex = 0; cellIndex< 9; cellIndex++) {
            const rowIndex = startRowIndex + Math.floor(cellIndex / 3)
            const colIndex = startColIndex + cellIndex % 3
            result.push(matrix[rowIndex][colIndex])
        }
        return result
    }
}

module.exports = class Toolkit {
    /**
     * 矩阵和数组相关工具
     * @returns {{makeRow(*=): *, makeMatrix(*=): *, shuffle(*): *}}
     */
    static get matrix() {
        return matrixToolkit
    }

    /**
     * 宫坐标系 相关的工具
     */
    static get box(){
        return boxToolkit
    }
}