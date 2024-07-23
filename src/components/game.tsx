import { useEffect, useLayoutEffect, useState } from "react";
import BoardDot from "./board-dot";
import Logo from "./logo";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Score from "./score";

const Game = () => {
  const savedBoard = localStorage.getItem("board");
  const savedScore = localStorage.getItem("score");
  const regGameBoard = Array(6 * 7).fill(0);
  const [loading, setLoading] = useState(true);
  const [gameBoard, setGameBoard] = useState(
    savedBoard ? JSON.parse(savedBoard) : regGameBoard
  );
  const [player, setPlayer] = useState(1);
  const [play, setPlay] = useState(true);
  const [playerWins, setPlayerWins] = useState(0);
  const [playerScores, setPlayerScores] = useState(
    savedScore
      ? JSON.parse(savedScore)
      : {
          playerOne: 0,
          playerTwo: 0,
        }
  );

  const switchPlayer = () => {
    setPlayer(player === 1 ? 2 : 1);
  };

  const updateBoard = (number: number) => {
    const newGameBoard = [...gameBoard];
    for (let i = newGameBoard.length - 1; i >= 0; i--) {
      if (i % 7 === number && newGameBoard[i] === 0) {
        newGameBoard[i] = player;
        break;
      }
    }
    switchPlayer();
    setGameBoard(newGameBoard);
  };

  const handleClick = (index: number) => {
    if (!play) {
      return;
    }
    setLoading(false);
    switch (index % 7) {
      case 0:
        updateBoard(0);
        break;
      case 1:
        updateBoard(1);
        break;
      case 2:
        updateBoard(2);
        break;
      case 3:
        updateBoard(3);
        break;
      case 4:
        updateBoard(4);
        break;
      case 5:
        updateBoard(5);
        break;
      case 6:
        updateBoard(6);
        break;
    }
  };

  const checkGameWin = (pl: number) => {
    for (let i = 0; i < gameBoard.length; i++) {
      if (
        (gameBoard[i] === pl &&
          gameBoard[i + 7] === pl &&
          gameBoard[i + 7 * 2] === pl &&
          gameBoard[i + 7 * 3] === pl) ||
        (gameBoard[i] === pl &&
          gameBoard[i - 7] === pl &&
          gameBoard[i - 7 * 2] === pl &&
          gameBoard[i - 7 * 3] === pl)
      ) {
        return true;
      } else if (
        (gameBoard[i] === pl &&
          gameBoard[i - 8] === pl &&
          gameBoard[i - 8 * 2] === pl &&
          gameBoard[i - 8 * 3] === pl) ||
        (gameBoard[i] === pl &&
          gameBoard[i + 8] === pl &&
          gameBoard[i + 8 * 2] === pl &&
          gameBoard[i + 8 * 3] === pl)
      ) {
        return true;
      } else if (
        (gameBoard[i] === pl &&
          gameBoard[i - 6] === pl &&
          gameBoard[i - 6 * 2] === pl &&
          gameBoard[i - 6 * 3] === pl) ||
        (gameBoard[i] === pl &&
          gameBoard[i + 6] === pl &&
          gameBoard[i + 6 * 2] === pl &&
          gameBoard[i + 6 * 3] === pl)
      ) {
        return true;
      } else if (
        (gameBoard[i] === pl &&
          gameBoard[i - 1] === pl &&
          gameBoard[i - 2] === pl &&
          gameBoard[i - 3] === pl) ||
        (gameBoard[i] === pl &&
          gameBoard[i + 1] === pl &&
          gameBoard[i + 2] === pl &&
          gameBoard[i + 3] === pl)
      ) {
        return true;
      }
    }
  };

  useLayoutEffect(() => {
    localStorage.setItem("board", JSON.stringify(gameBoard));

    const checkTurn = () => {
      const playerOne = gameBoard.reduce((a: number, b: number) => {
        if (b === 1) {
          return (a += 1);
        } else {
          return a;
        }
      }, 0);

      const playerTwo = gameBoard.reduce((a: number, b: number) => {
        if (b === 2) {
          return (a += 1);
        } else {
          return a;
        }
      }, 0);

      if (playerOne > playerTwo) {
        setPlayer(2);
      } else {
        setPlayer(1);
      }
    };

    checkTurn();

    const handleWin = () => {
      const playerOneWins = checkGameWin(1);
      const playerTwoWins = checkGameWin(2);

      if (playerOneWins || playerTwoWins) {
        setPlayerWins(playerOneWins ? 1 : 2);
        if (!loading) {
          setPlayerScores({
            playerOne: playerOneWins
              ? playerScores.playerOne + 1
              : playerScores.playerOne,
            playerTwo: playerTwoWins
              ? playerScores.playerTwo + 1
              : playerScores.playerTwo,
          });
        }
        setPlayer(0);
        setPlay(false);
      }
    };

    handleWin();
  }, [gameBoard]);

  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(playerScores));
  }, [playerScores]);

  const handlePlayAgain = () => {
    setGameBoard(regGameBoard);
    setPlay(true);
    setPlayerWins(0);
    setPlayer(1);
  };

  const handleRestart = () => {
    handlePlayAgain();
    setPlayerScores({
      playerOne: 0,
      playerTwo: 0,
    });
  };

  return (
    <main className="flex flex-col gap-10">
      <div className="flex justify-between gap-5 items-center">
        <Link to="/">menu</Link>
        <Logo />
        <button onClick={handleRestart}>Restart</button>
      </div>
      <div className="relative w-fit h-fit">
        <Score playerScores={playerScores} />
        <div className="grid grid-rows-6 grid-cols-7 gap-1 p-5 pb-10 bg-white rounded-2xl border-4 border-black shadow-[0_4px_0_#000]">
          {gameBoard.map((g: number, index: number) => {
            return (
              <BoardDot
                key={index}
                onClick={() => handleClick(index)}
                value={g}
                index={index}
              />
            );
          })}
        </div>
        <div
          className={clsx(
            "absolute -bottom-[80px] flex flex-col gap-3 left-1/2 -translate-x-1/2  rounded-lg p-3 min-w-[250px] min-h-[100px] font-bold text-2xl text-black justify-center items-center border-4 border-black shadow-[0_4px_0_#000]",
            {
              "bg-white": player === 0,
              "bg-green-500": player === 1,
              "bg-amber-400": player === 2,
            }
          )}
        >
          {playerWins === 0 ? (
            `Player ${player}'s Turn`
          ) : (
            <>
              <p>{`Player ${playerWins} Wins`}</p>
              <button
                onClick={handlePlayAgain}
                className="text-base bg-indigo-500 text-white px-3 py-1 rounded-lg"
              >
                Play Again
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Game;
