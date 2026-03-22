import { createBrowserRouter } from "react-router-dom";
import Aboutus from "./components/Url";
import App from "./App";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'url', element: <Url/> },
]);

export default router;