import React, { useEffect, useRef } from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import ButtonAdd from "./ButtonAdd";
const Product = ({ product }) => {
	const imgRef = useRef();

	return (
		<div className="col c-10 c-o-1 m-4 l-3">
			<div className="card">
				<div className="card_image">
					<Link to={`/product/${product.slug}`} className="Link">
						<img
							alt={product.image}
							ref={imgRef}
							className="lazy_load active"
							src="https://treobangron.com.vn/wp-content/uploads/2022/09/background-dep-4-2.jpg"
						/>
					</Link>
				</div>
				<div className="card_infor">
					<div className="title_card">
						<Link to={`/product/${product.slug}`} className="Link">
							<h1 style={{ color: "black" }}>This is title</h1>
						</Link>
					</div>
					<div className="description_card">
						<span>
							This is description for those tings his is description for those
							ting shis is description for those tings
						</span>
					</div>
					<div className="price_sold_card">
						<span>Price: $ 120</span>
						<span>Sold: 5</span>
					</div>
					<ButtonAdd product_id={product._id} slug={product.slug} />
				</div>
			</div>
		</div>
	);
};

export default Product;
