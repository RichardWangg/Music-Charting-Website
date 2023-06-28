import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";

import AlbumsList from "./pages/AlbumsList.js";
import SongsList from "./pages/SongsList.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "*",
    element: <App name="app" />,
  },
  {
    path: "/top50albums",
    element: <AlbumsList />,
  },
  {
    path: "/top50songs",
    element: <SongsList />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
