import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MenuPage from "./pages/menu-page";
import Game from "./components/game";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MenuPage />,
    },
    {
      path: "/vscpu",
      element: <Game />,
    },
    {
      path: "/vsplayer",
      element: "vsplayer",
    },
    {
      path: "/rules",
      element: "rules",
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
