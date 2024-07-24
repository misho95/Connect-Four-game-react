import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MenuPage from "./pages/menu-page";
import Play from "./components/play";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MenuPage />,
    },
    {
      path: "/vscpu",
      element: <Play type="cpu" />,
    },
    {
      path: "/vsplayer",
      element: <Play type="player" />,
    },
    {
      path: "/rules",
      element: "rules",
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
