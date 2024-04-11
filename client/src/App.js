import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedPage from "./components/ProtectedPage";
import Loader from "./components/Loader";
import {useSelector} from 'react-redux';
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ProductDetails from "./pages/ProductDetails.js";
import Payment from "./pages/Payment/index.js";
import Orders from "./pages/Profile/Orders/index.js";
import Products from "./pages/Profile/Products/index.js";
import LandingPage from "./pages/Landing/index.js";

function App() {
  const {loading} = useSelector(state => state.loaders);
  return (
    <div>
      {loading && <Loader/>}
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<ProtectedPage><LandingPage/></ProtectedPage>}/>
            <Route path="/shop" element={<ProtectedPage><Home/></ProtectedPage>}/>
            <Route path="/product/:id" element={<ProtectedPage><ProductDetails/></ProtectedPage>}/>
            <Route path="/add-to-cart" element={<ProtectedPage><Payment/></ProtectedPage>}/>
            <Route path="/profile/:tab?" element={<ProtectedPage><Profile key={3}/></ProtectedPage>}/>
            <Route path="/admin" element={<ProtectedPage><Admin/></ProtectedPage>}/>
            <Route path="/orders" element={<ProtectedPage><Orders/></ProtectedPage>}/>
            <Route path="/products" element={<ProtectedPage><Products/></ProtectedPage>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
