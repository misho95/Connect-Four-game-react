import clsx from "clsx";
import Score from "./board/score";
import Board from "./board/board";

const Game = ({
  playerScores,
  gameBoard,
  handleClick,
  player,
  playerWins,
  handlePlayAgain,
}) => {
  return (
    <div className="relative w-fit h-fit flex flex-col gap-5">
      <div className="lg:hidden flex flex-col gap-5">
        <Score playerScores={playerScores} />
        <Board gameBoard={gameBoard} handleClick={handleClick} />
      </div>
      <div className="hidden lg:block ">
        <Score playerScores={playerScores}>
          <Board gameBoard={gameBoard} handleClick={handleClick} />
        </Score>
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
  );
};

export default Game;
