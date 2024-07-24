import BoardDot from "./board-dot";

const Board = ({ gameBoard, handleClick }) => {
  return (
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
  );
};

export default Board;
