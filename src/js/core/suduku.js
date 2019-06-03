// 生成数独游戏


const Generator = require('./generator');

module.exports = class Suduku{
	constructor() { // 
		const generator = new Generator();
		generator.generate();
		this.solutionMatrix = generator.matrix;
	}

	make(level = 5) { // 生成
		const shouldRid = Math.random() * 9 < level;
		this.puzzleMatrix = this.solutionMatrix.map(row => row.map(cell => {
			return Math.random() * 9 < level ? 0 : cell;
		}));
	}
}