import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import AlbumsList from "./pages/AlbumsList.jsx";
import SongsList from "./pages/SongsList.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

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
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
