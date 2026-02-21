import express from 'express'
import cors from 'cors'


const app = express();

app.use(express.json());
app.use(cors());
const PORT = 3000;

//Products array
const products = [
	{
		id: 1,
		name: "Wrogn Graphic T-Shirt",
		description: "Cotton graphic printed t-shirt for casual wear",
		category: "tshirt",
		price: 799,
		colors: ["black", "white", "red"],
		sizes: ["S", "M", "L", "XL"],
		stock: 25,
		images: ["tshirt1.jpg"]
	},
	{
		id: 2,
		name: "Levis Slim Fit Shirt",
		description: "Slim fit casual shirt with soft fabric",
		category: "shirt",
		price: 1499,
		colors: ["blue", "grey"],
		sizes: ["M", "L", "XL"],
		stock: 15,
		images: ["shirt1.jpg"]
	},
	{
		id: 3,
		name: "Roadster Oversized T-Shirt",
		description: "Oversized streetwear style t-shirt",
		category: "tshirt",
		price: 999,
		colors: ["green", "black"],
		sizes: ["S", "M", "L"],
		stock: 18,
		images: ["tshirt2.jpg"]
	},
	{
		id: 4,
		name: "H&M Formal Shirt",
		description: "Formal office wear shirt",
		category: "shirt",
		price: 1799,
		colors: ["white", "lightblue"],
		sizes: ["M", "L", "XL"],
		stock: 12,
		images: ["shirt2.jpg"]
	},
	{
		id: 5,
		name: "Puma Sports T-Shirt",
		description: "Breathable sports t-shirt for workouts",
		category: "tshirt",
		price: 1299,
		colors: ["black", "yellow"],
		sizes: ["S", "M", "L", "XL"],
		stock: 20,
		images: ["tshirt3.jpg"]
	},
	{
		id: 6,
		name: "US Polo Casual Shirt",
		description: "Checked casual wear shirt",
		category: "shirt",
		price: 1999,
		colors: ["red", "navy"],
		sizes: ["M", "L"],
		stock: 10,
		images: ["shirt3.jpg"]
	}
];

//Cart array
let cart = [
	// {
	// 	id: 1,
	// 	name: "Wrogn Graphic T-Shirt",
	// 	price: 799,
	// 	selectedSize: "M",
	// 	selectedColor: "black",
	// 	quantity: 1
	// },
	// {
	// 	id: 2,
	// 	name: "Levis Slim Fit Shirt",
	// 	price: 1499,
	// 	selectedSize: "L",
	// 	selectedColor: "blue",
	// 	quantity: 2
	// },
	// {
	// 	id: 3,
	// 	name: "Roadster Cotton T-Shirt",
	// 	price: 599,
	// 	selectedSize: "S",
	// 	selectedColor: "white",
	// 	quantity: 1
	// }
];


// console.log(products);

//Method to get all products and get by category 
app.get('/products', (req, res) => {
	const { category } = req.query;

	const allowedCategories = ["tshirt", "shirt"];

	// if no category → return all products
	if (!category) {
		return res.json(products);
	}

	// validate category
	if (!allowedCategories.includes(category.toLowerCase())) {
		return res.status(400).json({
			success: false,
			message: "Invalid category. Only tshirt or shirt allowed."
		});
	}

	// filter products
	const filteredProducts = products.filter(
		(p) => p.category.toLowerCase() === category.toLowerCase()
	);

	res.json(filteredProducts);
});

// Method to get product by id
app.get('/products/:id', (req, res) => {
	const id = parseInt(req.params.id);

	const prod = products.find(
		(p) => p.id === id
	);

	if (!prod) {
		return res.status(404).json({
			sucess: false,
			Message: 'product not found'
		});
	}
	res.status(200).json(prod);
});

//Method to add new product in products array
app.post('/products', (req, res) => {
	let id = products.length + 1;

	let product = {
		id: id,
		...req.body
	};

	//   console.log(product);

	products.push(product);

	res.status(201).json({ success: true, product });
});

//Method to add products in a cart array
app.post('/cart', (req, res) => {

	// Check if same product + same variant exists
	let existingProductInd = cart.findIndex(
		(prod) =>
			req.body.id === prod.id &&
			req.body.selectedColor === prod.selectedColor &&
			req.body.selectedSize === prod.selectedSize
	);

	if (existingProductInd !== -1) {
		cart[existingProductInd].quantity++;
		return res.status(200).json({ success: true, cart });
	}

	// Create unique cart item
	let product = {
		cartItemId: Date.now() + Math.random(), // ✅ unique
		...req.body
	};

	cart.push(product);

	res.status(201).json({ success: true, cart });
});

//Method to get all products from and cart array
app.get('/cart', (req, res) => {
	res.status(200).json(cart);
});

// Method to remove item from an array
app.delete('/cart/:cartItemId', (req, res) => {
    const cartItemId = req.params.cartItemId; // string, works with Date.now()+Math.random()

    // Remove only the exact variant
    cart = cart.filter((p) => p.cartItemId != cartItemId);

    res.status(200).json({
        message: 'product removed',
        cart
    });
});












app.listen(PORT, () => {
	console.log(`Running on port ${PORT}`);
});