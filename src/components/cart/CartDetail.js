import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { isFail, isLoading, isSucess } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const CartDetail = ({ cart, axiosjwt }) => {
	const [deleteCart, setDeleteCart] = useState(false);
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const imgRef = useRef();
	useEffect(() => {
		const img = imgRef.current;
		const ob = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				img.setAttribute(
					"src",
					"https://mobimg.b-cdn.net/v3/fetch/d5/d5a328676c4281c3fe5271e1bc95a978.jpeg"
				);
				img.classList.add("img_active");
			}
		});
		if (img) {
			ob.observe(img);
		}
		return () => {
			if (img) {
				ob.unobserve(img);
			}
		};
	}, []);

	const handleDeleteCart = async (e) => {
		e.preventDefault();
		dispatch(isLoading());
		try {
			const res = await axiosjwt.post(`/auth/unadd/${cart._id}`, "", {
				headers: {
					token: `Bearer ${auth.user.accessToken}`,
				},
			});
			toast.success(res.data.msg);
			dispatch(isSucess());
		} catch (err) {
			toast.error(err.response.data.msg);
			dispatch(isFail());
		}
	};
	return (
		<div className="cart_detail">
			<div className="cart_image">
				<img className="img_cart" ref={imgRef} alt={cart.image} />
			</div>
			<div className="cart_infor">
				<div className="title_cart">
					<h1>This is title of this thing</h1>
				</div>
				<div className="description_cart">
					<span>
						This is description for these things This is description for these
						things This is description for these things This is description for
						these things
					</span>
				</div>
				<div className="price-sold-buy_cart">
					<div className="row h_100">
						<div className="col c-7 m-7 l-7 h_100">
							<div className="price_sold_cart">
								<span>Price: $ 120</span>
								<span>Sold: 15</span>
							</div>
						</div>
						<div className="col c-5 m-5 l-5 h_100">
							<div className="buy_cart">
								<button>Mua</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div onClick={() => setDeleteCart(!deleteCart)} className="navbar_delete">
				<FontAwesomeIcon icon={faEllipsis} />
			</div>
			{deleteCart && (
				<button
					type="submit"
					onClick={handleDeleteCart}
					className="set_delete_button"
				>
					Xóa
				</button>
			)}
		</div>
	);
};

export default CartDetail;
