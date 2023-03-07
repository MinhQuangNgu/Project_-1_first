import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./components/auth/Login";
import HomePage from "./components/homepages/HomePage";
import Register from "./components/auth/Register";
import ProductDetail from "./components/products/ProductDetail";
import Createproduct from "./components/products/Createproduct";
import { useEffect, useRef } from "react";
import Loading from "./components/utils/Loading";
import { useDispatch, useSelector } from "react-redux";
import ActiveEmail from "./components/auth/ActiveEmail";
import EditProduct from "./components/auth/EditProduct";
import Cart from "./components/cart/Cart";
import { isSucess } from "./components/redux/slices/authSlice";

function App() {
	const auth = useSelector((state) => state.auth);
	const cache = useRef({});
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(isSucess());
	}, []);
	return (
		<Router>
			<div className="App">
				<Header />
				<main>
					<Routes>
						<Route path="/product/create" element={<Createproduct />} />
						<Route path="/active/:token" element={<ActiveEmail />} />
						<Route
							path="/product/:slug"
							element={<ProductDetail cache={cache} />}
						/>
						<Route path="/edit/:slug" element={<EditProduct cache={cache} />} />
						<Route path="/login" element={<Login />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/register" element={<Register />} />
						<Route path="/" exact element={<HomePage cache={cache} />} />
					</Routes>
				</main>
				<footer></footer>

				<ToastContainer style={{ fontSize: "1.5rem", width: "40rem" }} />
				{auth.loading && <Loading />}
			</div>
		</Router>
	);
}

export default App;
