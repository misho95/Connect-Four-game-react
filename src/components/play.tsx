import { useEffect, useLayoutEffect, useState } from "react";
import BoardHeader from "../components/board/header";
import Game from "../components/game";

type PropsType = {
  type: "player" | "cpu";
};

const Play = ({ type }: PropsType) => {
  const savedBoard =
    type === "player"
      ? localStorage.getItem("board-player")
      : localStorage.getItem("board-cpu");
  const savedScore =
    type === "player"
      ? localStorage.getItem("score-player")
      : localStorage.getItem("score-cpu");

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
  const [turn, setTurn] = useState(0);

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
    type === "player"
      ? localStorage.setItem("board-player", JSON.stringify(gameBoard))
      : localStorage.setItem("board-cpu", JSON.stringify(gameBoard));

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
    type === "player"
      ? localStorage.setItem("score-player", JSON.stringify(playerScores))
      : localStorage.setItem("score-cpu", JSON.stringify(playerScores));
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

  const handleCpuTurn = () => {
    while (true) {
      const randomNumb = Math.round(Math.random() * 41);
      const find = gameBoard.find((v: number, i: number) => {
        if (i === randomNumb && v === 0) {
          return true;
        }
      });

      if (find === 0) {
        handleClick(randomNumb);
        break;
      }
    }
  };

  useEffect(() => {
    if (type === "cpu" && player === 2) {
      handleCpuTurn();
    }
  }, [player]);

  return (
    <main className="flex flex-col gap-10 my-20">
      <BoardHeader handleRestart={handleRestart} />
      <Game
        playerScores={playerScores}
        gameBoard={gameBoard}
        handleClick={handleClick}
        player={player}
        playerWins={playerWins}
        handlePlayAgain={handlePlayAgain}
      />
    </main>
  );
};

export default Play;
