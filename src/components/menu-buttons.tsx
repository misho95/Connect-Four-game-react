import { ReactNode } from "react";
import { cn } from "../utils/cn";
import { Link, LinkProps } from "react-router-dom";

interface buttonType extends LinkProps {
  className?: string;
  children: ReactNode;
  Icon?: any;
}

const MenuButtons = ({ children, className, Icon, ...props }: buttonType) => {
  return (
    <Link
      {...props}
      className={cn(
        "bg-white text-black uppercase font-bold text-left p-3 pr-[100px] rounded-lg border-[2px] border-black shadow-[0_3px_1px_#000] active:shadow-[0_1px_1px_#000] relative",
        className
      )}
    >
      {children}
      {Icon && (
        <div className="absolute top-1/2 -translate-y-1/2 right-2">
          {<Icon className={className} />}
        </div>
      )}
    </Link>
  );
};

export default MenuButtons;
