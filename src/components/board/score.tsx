import clsx from "clsx";
import { ReactNode } from "react";
import { LiaSmileWink } from "react-icons/lia";

type PropsType = {
  playerScores: { playerOne: number; playerTwo: number };
  children?: ReactNode;
};

const Score = ({ children, playerScores }: PropsType) => {
  return (
    <div className="flex justify-between items-center gap-5">
      <PlayerScoreCard player={1} score={playerScores.playerOne} />
      {children && children}
      <PlayerScoreCard player={2} score={playerScores.playerTwo} />
    </div>
  );
};

export default Score;

const PlayerScoreCard = ({
  player,
  score,
}: {
  player: number;
  score: number;
}) => {
  return (
    <div className="p-5 text-center pt-8 bg-white border-4 border-black shadow-[0_4px_0_#000] rounded-xl relative">
      <LiaSmileWink
        className={clsx(
          "size-10 absolute -top-5 left-1/2 -translate-x-1/2 rounded-full",
          {
            "bg-green-500": player === 1,
            "bg-amber-400": player === 2,
          }
        )}
      />
      <h5 className="font-bold text-lg">{`Player ${player}`}</h5>
      <h2 className="text-4xl font-bold">{score}</h2>
    </div>
  );
};
