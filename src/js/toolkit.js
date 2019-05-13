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
    }
}

module.exports = matrixToolkit