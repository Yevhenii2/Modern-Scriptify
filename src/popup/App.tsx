import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AddScript from "./routes/AddScript";
import EditScript from "./routes/EditScript";
import Home from "./routes/Home";
import store from "./store";

import "./styles/styles.scss";

const router = createBrowserRouter([ {
  path: "/index.html",
  element: <Home />,
},
{
  path: "/add-script",
  element: <AddScript />,
},
{
  path: "/edit-script/:scriptId",
  element: <EditScript />,
},
]);

const App = () => {

  return (<Provider store={store}>
    <RouterProvider router={router} />
  </Provider>);
};

export default App;