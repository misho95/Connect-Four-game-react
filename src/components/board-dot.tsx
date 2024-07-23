import clsx from "clsx";

type PropsType = React.HTMLAttributes<HTMLDivElement> & {
  value: number;
  index: number;
  win?: true;
};

const BoardDot = ({ value, win, index, ...props }: PropsType) => {
  return (
    <div
      {...props}
      className={clsx(
        " size-10 sm:size-14 lg:size-20 rounded-full border-[4px] border-black relative overflow-hidden select-none duration-200",
        {
          "bg-indigo-500": value === 0,
          "bg-green-500": value === 1,
          "bg-amber-400": value === 2,
        }
      )}
    >
      <div
        className={clsx("absolute w-full h-full border-t-[6px] rounded-full", {
          "border-black/50": value !== 0,
          "border-black": value === 0,
        })}
      />
      {win && (
        <div className="w-1/2 h-1/2 border-[10px] blur-[1px] border-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      )}
    </div>
  );
};

export default BoardDot;
