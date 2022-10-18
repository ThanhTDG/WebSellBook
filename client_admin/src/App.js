import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Home from "./pages/home/Home";
import Products from "./pages/list/products/Products";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
import './root.scss';

function App() {
  return (
    <div className="App">
      <div className="AppGlass">
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="users">
                <Route path=":userId" element={<Single />} />
                <Route path="new" element={<New />} />
              </Route>
              <Route path="Products">
                <Route index element={<Products />} />
                <Route path=":productId" element={<Single />} />
                <Route path="new" element={<New />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
