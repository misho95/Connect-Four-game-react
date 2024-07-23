import clsx from "clsx";
import { LiaSmileWink } from "react-icons/lia";

type PropsType = {
  playerScores: { playerOne: number; playerTwo: number };
};

const Score = ({ playerScores }: PropsType) => {
  return (
    <div className="relative lg:absolute w-[200%] top-1/2 -translate-y-1/2 -left-1/2 flex justify-between">
      <PlayerScoreCard player={1} score={playerScores.playerOne} />
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
