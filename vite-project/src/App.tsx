import { useRoutes } from "react-router-dom";
import Canhan from "./pages/canhan";
import Admin from "./pages/admin";


const routeConfig = [
  {
    path: "/",
    element: <Canhan />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
];

function App() {
  const routes = useRoutes(routeConfig);

  return <main>{routes}</main>;
}

export default App;