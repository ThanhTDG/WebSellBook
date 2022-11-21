export const productToID = (product) => {
	let newProduct = {
		...product,
		id: product._id,
	};
	return newProduct;
};
