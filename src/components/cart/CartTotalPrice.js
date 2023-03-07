import React, { useEffect, useState } from "react";

const CartTotalPrice = ({ cart }) => {
	const [total, setTotal] = useState();
	useEffect(() => {
		if (cart) {
			const sum = cart.reduce((num, item) => (num += item.price), 0);
			setTotal(sum);
		}
	}, [cart]);
	return (
		<div className="total_price_cart">
			<span>Total</span>
			<span>$ 140</span>
		</div>
	);
};

export default CartTotalPrice;
