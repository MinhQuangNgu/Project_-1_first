import React, { useEffect, useRef, useState } from "react";
import CreateForm from "../products/CreateForm";
import Product from "../products/Product";
import "./HomePage.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getProduct, isSucess } from "../redux/slices/authSlice";
import { useLocation } from "react-router-dom";
import Page from "../paginating/Page";
import Sorting from "./Sorting";
import Searching from "./Searching";
const HomePage = ({ cache }) => {
	const { search } = useLocation();

	const found = new URLSearchParams(search).toString();

	const [products, setProducts] = useState();
	const dispatch = useDispatch();

	let count = useRef(0);
	useEffect(() => {
		let here = true;
		if (here) {
			dispatch(isSucess());
		}
		const url = `/product?${found}`;
		if (cache.current[url]) {
			return setProducts(cache.current[url]);
		}
		axios
			.get(url)
			.then((res) => {
				if (!here) {
					return;
				}
				cache.current[url] = res.data;
				dispatch(getProduct(res.data));
				setProducts(res.data);
			})
			.catch((err) => {
				if (!here) {
					return;
				}
				toast.error(err.response.data.msg);
			});
		return () => {
			here = false;
		};
	}, [search]);
	return (
		<div className="grid wide">
			<div className="row">
				<div className="col c-12 l-12 m-12">
					<div className="categary_container">
						<Sorting />
						<Searching />
					</div>
				</div>
				<Product product={{}} />
				<Product product={{}} />
				<Product product={{}} />
				<Product product={{}} />
				<Product product={{}} />
				<Product product={{}} />
				<Product product={{}} />
				<Product product={{}} />
				<Product product={{}} />
				<Product product={{}} />
				<Product product={{}} />
				<Product product={{}} />
				{products?.products?.map((product) => (
					<Product key={product._id + "A"} product={product} />
				))}
				<CreateForm />
			</div>
			<div className="row">
				<div className="col c-12 m-12 l-12">
					<Page total={products?.total} />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
