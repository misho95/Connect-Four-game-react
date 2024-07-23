import clsx from "clsx";

const Logo = () => {
  return (
    <div className="grid grid-rows-2 grid-cols-2 gap-1 hover:rotate-[360deg] active:rotate-[360deg] duration-500 w-[36px] sm:w-[40px] lg:w-[44px]">
      <Circale color="pink" />
      <Circale color="yellow" />
      <Circale color="yellow" />
      <Circale color="pink" />
    </div>
  );
};

export default Logo;

const Circale = ({ color }: { color: "pink" | "yellow" }) => {
  return (
    <div
      className={clsx(
        "size-[16px] sm:size-[18px] lg:size-[20px] rounded-full border-[2px] border-black shadow-[0px_2px_1px] shadow-black",
        {
          "bg-green-500": color === "pink",
          "bg-amber-400": color === "yellow",
        }
      )}
    />
  );
};
