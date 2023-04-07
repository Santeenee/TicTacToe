import { useMemo, useState } from 'react'

export default function Board() {
	//contains the values of the cells
	const [boardArr, setBoardArr] = useState<['' | 'X' | 'O']>([''])
	const [times, setTimes] = useState<number>(0)

	useMemo(() => resetBoard(), [])

	//every time the board updates, check the winner
	useMemo(() => {
		if (times > 4) {
			let winner = checkWinner()
			console.log(winner)
			if (winner != undefined) {
				printWinner(winner)
			}
		}
	}, [boardArr])

	function resetBoard() {
		setTimes(0)
		setBoardArr((boardArr): any => ['', '', '', '', '', '', '', '', '']) //! ANY
	}

	function printWinner(x: 'PlayerX' | 'PlayerO' | 'Tie') {
		//create a <div>
		let winnerPopup = document.createElement('div')

		x === 'Tie'
			? (winnerPopup.innerHTML = `<p>It's a ${x}!</p>`)
			: (winnerPopup.innerHTML = `<p>The winner is ${x}!</p>`)

		winnerPopup.classList.add('winner-popup')

		//remove mouse interactions
		const boardElem = document.querySelector('.board') as HTMLElement
		boardElem.style.pointerEvents = 'none'

		//add <div> to the document
		document.querySelector('#root')?.appendChild(winnerPopup)

		setTimeout(() => {
			winnerPopup.remove()

			//re-add mouse interactions
			boardElem.style.pointerEvents = 'auto'

			resetBoard()
		}, 3000)
	}

	function checkWinner(): 'PlayerX' | 'PlayerO' | 'Tie' | undefined {
		let b = [...boardArr]
		console.log(b)

		//check horizontal
		for (let h = 2; h < 8; h += 3) {
			if (b[h] !== '' && b[h] === b[h - 1] && b[h - 1] === b[h - 2]) {
				return `Player ${b[h]}`
			}
		}

		//check vertical
		for (let v = 0; v < 3; v++) {
			if (b[v] !== '' && b[v] === b[v + 3] && b[v + 3] === b[v + 6]) {
				return `Player${b[v]}`
			}
		}

		//check diagonals
		if (b[0] !== '' && b[0] === b[4] && b[4] === b[8]) {
			return `Player${b[0]}`
		} else if (b[2] !== '' && b[2] === b[4] && b[4] === b[6]) {
			return `Player${b[2]}`
		}

		//when board is full && all values !== ''
		//then 'Tie'
		let bfiltered = b.filter(cell => cell !== '')
		console.log('b.filter è:')
		console.log(bfiltered)
		if (bfiltered.length === 9) {
			return 'Tie'
		}

		//no winner, no tie, the game goes on
		return //same as 'return undefined'
	}

	function handleClick(index: number) {
		if (boardArr[index] === '') {
			let newArr: ['' | 'X' | 'O'] = [...boardArr]

			if (times % 2 === 0) {
				newArr[index] = 'X'
				setBoardArr(newArr)
			}
			if (times % 2 === 1) {
				newArr[index] = 'O'
				setBoardArr(newArr)
			}
			setTimes(times => ++times)
		}
	}

	return (
		<div className="board">
			{boardArr.map((item, index: number) => (
				<button
					role="button"
					className="cell"
					onClick={() => handleClick(index)}
					key={index}
				>
					{item === 'X' ? (
						<img src="assets/X.svg" />
					) : item === 'O' ? (
						<img src="assets/O.svg" />
					) : (
						''
					)}
				</button>
			))}
		</div>
	)
}
