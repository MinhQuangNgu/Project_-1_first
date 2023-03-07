import React, { useEffect, useRef, useState } from "react";
import "./Cart.css";
import CartDetail from "./CartDetail";
import PriceCart from "./PriceCart";
import { useDispatch, useSelector } from "react-redux";
import { createJWT } from "../utils/AxiosJWT";
import { isLogin } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartTotalPrice from "./CartTotalPrice";
const Cart = () => {
	const [cart, setCart] = useState();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const countTime = useRef(0);

	const axiojwt = createJWT(dispatch, auth.user?.accessToken, isLogin);

	let count = useRef(0);
	useEffect(() => {
		let here = true;
		if (!auth.user) {
			if (count.current === 1) {
				return;
			}
			return () => {
				count.current++;
				toast.error("Please login.");
				navigate("/login");
			};
		}

		const getCart = async () => {
			try {
				const res = await axiojwt.get(`/auth/cart`, {
					headers: {
						token: `Bearer ${auth.user.accessToken}`,
					},
				});
				if (!here) {
					return;
				}
				setCart(res.data.cart);
			} catch (err) {
				toast.error(err.response.data.msg);
			}
		};
		if (here) {
			getCart();
		}
		return () => {
			here = false;
		};
	}, []);

	return (
		<div className="grid wide">
			<div className="row cart_con">
				<div className="col c-8 m-8 l-8">
					<div className="row">
						<div className="col c-12 m-12 l-12">
							<CartDetail axiosjwt={axiojwt} cart={{}} />
							<CartDetail axiosjwt={axiojwt} cart={{}} />
							<CartDetail axiosjwt={axiojwt} cart={{}} />
						</div>
					</div>
				</div>
				<div className="col c-4 m-4 l-4">
					<div className="total_cart">
						<PriceCart cart={{}} />
						<PriceCart cart={{}} />
						{cart?.map((item) => (
							<PriceCart cart={item} key={item._id + "price"} />
						))}
						<hr className="HR" />
						<CartTotalPrice cart={cart} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
