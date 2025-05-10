import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import CustomErrorPage from "./components/CustomErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <NavBar />
        <Home />
      </div>
    ),
    errorElement: <CustomErrorPage />, // handles root-level errors
  },

  {
    path: "/pastes",
    element: (
      <div>
        <NavBar />
        <Paste />
      </div>
    ),
    errorElement: <CustomErrorPage />,
  },

  {
    path: "/pastes/:id", // 
    element: (
      <div>
        <NavBar />
        <ViewPaste />
      </div>
    ),
    errorElement: <CustomErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
