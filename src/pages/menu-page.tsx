import Logo from "../components/logo";
import MenuButtons from "../components/menu-buttons";
import { PiSmileyLight, PiSmileyMeh } from "react-icons/pi";
import { cn } from "../utils/cn";

const MenuPage = () => {
  return (
    <main className="flex flex-col items-center gap-10">
      <Logo />
      <div className="flex flex-col gap-3">
        <MenuButtons
          to="/vscpu"
          className="bg-green-500 text-white"
          Icon={IconVsCpu}
        >
          play vs cpu
        </MenuButtons>
        <MenuButtons
          to="/vsplayer"
          className="bg-amber-400"
          Icon={IconVsPlayer}
        >
          play vs player
        </MenuButtons>
        <MenuButtons to="/rules">game rules</MenuButtons>
      </div>
    </main>
  );
};

export default MenuPage;

const IconVsCpu = ({ className }: { className?: string }) => {
  return (
    <div className="relative h-8 w-12">
      <PiSmileyLight
        className={cn(
          "size-8 absolute top-0 left-0 z-20 rounded-full",
          className
        )}
      />
      <PiSmileyMeh
        className={cn("size-8 absolute top-0 left-5 rounded-full", className)}
      />
    </div>
  );
};

const IconVsPlayer = ({ className }: { className?: string }) => {
  return (
    <div className="relative h-8 w-12">
      <PiSmileyLight
        className={cn(
          "size-8 absolute top-0 left-0 z-20 rounded-full",
          className
        )}
      />
      <PiSmileyLight
        className={cn("size-8 absolute top-0 left-5 rounded-full", className)}
      />
    </div>
  );
};
