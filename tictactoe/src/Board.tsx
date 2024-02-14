import { useEffect, useState } from "react";

export default function Board() {
  //contains the values of the cells
  const [boardArr, setBoardArr] = useState<("" | "X" | "O")[]>(new Array(9));
  const [times, setTimes] = useState<number>(0);

  useEffect(() => resetBoard(), []);

  //every time the board updates, check the winner
  useEffect(() => {
    if (times > 4) {
      const winner = checkWinner();
      console.log(winner);
      if (winner !== undefined) {
        printWinner(winner);
      }
    }
  }, [boardArr]);

  function resetBoard() {
    setTimes(0);
    setBoardArr((boardArr) => ["", "", "", "", "", "", "", "", ""]);
  }

  function printWinner(x: "PlayerX" | "PlayerO" | "Tie") {
    //create a <div>
    const winnerPopup = document.createElement("div");

    if (x === "Tie") winnerPopup.innerHTML = `<p>It's a ${x}!</p>`;
    else winnerPopup.innerHTML = `<p>The winner is ${x}!</p>`;

    winnerPopup.classList.add("winner-popup");

    //remove mouse interactions
    const boardElem = document.querySelector(".board") as HTMLElement;
    boardElem.style.pointerEvents = "none";

    //add <div> to the document
    document.querySelector("#root")?.appendChild(winnerPopup);

    setTimeout(() => {
      winnerPopup.remove();

      //re-add mouse interactions
      boardElem.style.pointerEvents = "auto";

      resetBoard();
    }, 3000);
  }

  function checkWinner() {
    const board = boardArr;
    console.log(board);

		//TODO fix bug here
    //check horizontal
    for (let h = 2; h < 8; h += 3) {
      if (board[h] !== "" && board[h] === board[h - 1] && board[h - 1] === board[h - 2]) {
        return `Player${board[h]}`;
      }
    }

    //check vertical
    for (let v = 0; v < 3; v++) {
      if (board[v] !== "" && board[v] === board[v + 3] && board[v + 3] === board[v + 6]) {
        return `Player${board[v]}`;
      }
    }

    //check diagonals
    if (board[0] !== "" && board[0] === board[4] && board[4] === board[8]) {
      return `Player${board[0]}`;
    }
    if (board[2] !== "" && board[2] === board[4] && board[4] === board[6]) {
      return `Player${board[2]}`;
    }

    //when board is full && all values !== ''
    //then 'Tie'
    const bfiltered = board.filter((cell) => cell !== "");
    console.log("b.filter è:");
    console.log(bfiltered);
    if (bfiltered.length === 9) {
      return "Tie";
    }

    //no winner, no tie, the game goes on
    return;
  }

  function handleClick(index: number) {
    if (boardArr[index] === "") {
      const newArr: ("" | "X" | "O")[] = boardArr;

      if (times % 2 === 0) {
        newArr[index] = "X";
        setBoardArr(newArr);
      }
      else {
        newArr[index] = "O";
        setBoardArr(newArr);
      }
      setTimes((times) => ++times);
    }
  }

  return (
    <div className="board">
      {boardArr.map((item, index: number) => (
        // biome-ignore lint/a11y/useButtonType: <explanation>
        <button
          role="button"
          className="cell"
          onClick={() => handleClick(index)}
          key={index} //Biome doesn't like this element
        >
          {item === "X" ? (
            <img src="assets/X.svg" alt="X symbol" />
          ) : item === "O" ? (
            <img src="assets/O.svg" alt="O symbol" />
          ) : (
            ""
          )}
        </button>
      ))}
    </div>
  );
}
