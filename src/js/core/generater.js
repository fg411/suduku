// 生成数独解决方案
const Toolkit = require('./toolkit');

module.exports = class Generate {
    generate() {
        while (!this.internalGenerate()){}
    }
    internalGenerate() {
        this.matrix = Toolkit.matrix.makeMatrix();
        this.orders = Toolkit.matrix.makeMatrix()
            .map(row => row.map((v, i) => i))
            .map(row => Toolkit.matrix.shuffle(row));

        // Toolkit.matrix.makeRow().every((n))
        for (let n = 1; n <=9; n++){
            if(!this.fillNumber(n)){
                return false;
            }
        }
        return true;
    }
    fillNumber(n) {
        return this.fillRow(n, 0);
    }
    fillRow(n, rowIndex) {
        if(rowIndex > 8) {
            return true
        }

        const row = this.matrix[rowIndex];
        const orders = this.orders[rowIndex];
        for(let i = 0; i< 9;i++){
            const colIndex  = orders[i];
            if(row[colIndex]) {
                continue
            }
            if(!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                continue
            }

            row[colIndex] = n;

            //填写下一行的 n，如果失败，就在当前行寻找下一个可填写 n 的位置
            if(!this.fillRow(n, rowIndex + 1)){
                row[colIndex] = 0;
                continue;
            }

            // 当前行填写 n 成功后，可递归调用该方法在下一行内填写 n
            // this.fillRow(n. rowIndex +1)

            return true
        }

        return false
    }

};