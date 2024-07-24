import { Link } from "react-router-dom";
import Logo from "../logo";

const BoardHeader = ({ handleRestart }) => {
  return (
    <div className="flex justify-between gap-5 items-center">
      <Link to="/">menu</Link>
      <Logo />
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
};

export default BoardHeader;
