import statusReceipt from "~/stores/Receipt/statusReceipt";

const receipts = [
	{
		id: 1,
		pay: 144000,
		status: statusReceipt.notProcessed,
		address: {
			id: "6390023e68b6bce81199e74d",
			fullName: "Nguyen Van An",
			phone: "0987654321",
			region: "Lâm Đồng",
			district: "TP. Đà Lạt",
			ward: "Phường 8",
			address: "17 Phù Đổng Thiên Vương",
		},
		acceptAnOderTime: "",
		statuses: [{ date: Date.now(), type: statusReceipt.notProcessed }],
		user: {
			id: "639208cdc2538b0b44bda379",
			email: "haclamthien12@gmail.com",
			fistName: "Hữu",
			lastName: "Nhữ Văn",
			sdt: "0971727931",
		},
		products: [
			{
				id: "634ed8e4f6a3a7266d99276d",
				name: "Thiên Sứ Nhà Bên – Tập 3",
				amount: 2,
				price: 72000,
				category: {
					_id: "634d8da516d1688abe54d4ef",
					name: "Light novel",
				},
				images: [
					"https://salt.tikicdn.com/ts/product/01/93/08/61e928ce145c06a11a483ed49d826da2.jpg",
				],
			},
			{
				id: "634ed8e4f6a3a7266d99276d",
				name: "Thiên Sứ Nhà Bên – Tập 3",
				amount: 2,
				price: 72000,
				category: {
					_id: "634d8da516d1688abe54d4ef",
					name: "Light novel",
				},
				images: [
					"https://salt.tikicdn.com/ts/product/01/93/08/61e928ce145c06a11a483ed49d826da2.jpg",
				],
			},
			{
				id: "634ed8e4f6a3a7266d99276d",
				name: "Thiên Sứ Nhà Bên – Tập 3",
				amount: 2,
				price: 72000,
				category: {
					_id: "634d8da516d1688abe54d4ef",
					name: "Light novel",
				},
				images: [
					"https://salt.tikicdn.com/ts/product/01/93/08/61e928ce145c06a11a483ed49d826da2.jpg",
				],
			},
			{
				id: "634ed8e4f6a3a7266d99276d",
				name: "Thiên Sứ Nhà Bên – Tập 3",
				amount: 2,
				price: 72000,
				category: {
					_id: "634d8da516d1688abe54d4ef",
					name: "Light novel",
				},
				images: [
					"https://salt.tikicdn.com/ts/product/01/93/08/61e928ce145c06a11a483ed49d826da2.jpg",
				],
			},
			{
				id: "634ed8e4f6a3a7266d99276d",
				name: "Thiên Sứ Nhà Bên – Tập 3",
				amount: 2,
				price: 72000,
				category: {
					_id: "634d8da516d1688abe54d4ef",
					name: "Light novel",
				},
				images: [
					"https://salt.tikicdn.com/ts/product/01/93/08/61e928ce145c06a11a483ed49d826da2.jpg",
				],
			},
			{
				id: "634ed8e4f6a3a7266d99276d",
				name: "Thiên Sứ Nhà Bên – Tập 3",
				amount: 2,
				price: 72000,
				category: {
					_id: "634d8da516d1688abe54d4ef",
					name: "Light novel",
				},
				images: [
					"https://salt.tikicdn.com/ts/product/01/93/08/61e928ce145c06a11a483ed49d826da2.jpg",
				],
			},
		],
	},
	{
		id: 2,
		total: 144000,
		status: statusReceipt.processing,
		address: {
			id: "6390023e68b6bce81199e74d",
			fullName: "Nguyen Van An",
			phone: "0987654321",
			region: "Lâm Đồng",
			district: "TP. Đà Lạt",
			ward: "Phường 8",
			address: "17 Phù Đổng Thiên Vương",
		},
		user: {
			id: "639208cdc2538b0b44bda379",
			email: "haclamthien12@gmail.com",
			fistName: "Hữu",
			lastName: "Nhữ Văn",
			sdt: "0971727931",
		},
		products: [
			{
				id: "634ed8e4f6a3a7266d99276d",
				name: "Thiên Sứ Nhà Bên – Tập 3",
				amount: 2,
				price: 72000,
				category: {
					_id: "634d8da516d1688abe54d4ef",
					name: "Light novel",
				},
				images: [
					"https://salt.tikicdn.com/ts/product/01/93/08/61e928ce145c06a11a483ed49d826da2.jpg",
				],
			},
		],
	},

	{
		id: 3,
		total: 144000,
		status: statusReceipt.shipping,
		address: {
			id: "6390023e68b6bce81199e74d",
			fullName: "Nguyen Van An",
			phone: "0987654321",
			region: "Lâm Đồng",
			district: "TP. Đà Lạt",
			ward: "Phường 8",
			address: "17 Phù Đổng Thiên Vương",
		},
		user: {
			id: "639208cdc2538b0b44bda379",
			email: "haclamthien12@gmail.com",
			fistName: "Hữu",
			lastName: "Nhữ Văn",
			sdt: "0971727931",
		},
		products: [
			{
				id: "634ed8e4f6a3a7266d99276d",
				name: "Thiên Sứ Nhà Bên – Tập 3",
				amount: 2,
				price: 72000,
				category: {
					_id: "634d8da516d1688abe54d4ef",
					name: "Light novel",
				},
				images: [
					"https://salt.tikicdn.com/ts/product/01/93/08/61e928ce145c06a11a483ed49d826da2.jpg",
				],
			},
		],
	},
	{
		id: 4,
		total: 144000,
		status: statusReceipt.completed,
		address: {
			id: "6390023e68b6bce81199e74d",
			fullName: "Nguyen Van An",
			phone: "0987654321",
			region: "Lâm Đồng",
			district: "TP. Đà Lạt",
			ward: "Phường 8",
			address: "17 Phù Đổng Thiên Vương",
		},
		user: {
			id: "639208cdc2538b0b44bda379",
			email: "haclamthien12@gmail.com",
			fistName: "Hữu",
			lastName: "Nhữ Văn",
			sdt: "0971727931",
		},
		products: [
			{
				id: "634ed8e4f6a3a7266d99276d",
				name: "Thiên Sứ Nhà Bên – Tập 3",
				amount: 2,
				price: 72000,
				category: {
					_id: "634d8da516d1688abe54d4ef",
					name: "Light novel",
				},
				images: [
					"https://salt.tikicdn.com/ts/product/01/93/08/61e928ce145c06a11a483ed49d826da2.jpg",
				],
			},
		],
	},
	{
		id: 5,
		total: 144000,
		status: statusReceipt.canceled,
		address: {
			id: "6390023e68b6bce81199e74d",
			fullName: "Nguyen Van An",
			phone: "0987654321",
			region: "Lâm Đồng",
			district: "TP. Đà Lạt",
			ward: "Phường 8",
			address: "17 Phù Đổng Thiên Vương",
		},
		user: {
			id: "639208cdc2538b0b44bda379",
			email: "haclamthien12@gmail.com",
			fistName: "Hữu",
			lastName: "Nhữ Văn",
			sdt: "0971727931",
		},
		products: [
			{
				id: "634ed8e4f6a3a7266d99276d",
				name: "Thiên Sứ Nhà Bên – Tập 3",
				amount: 2,
				price: 72000,
				category: {
					_id: "634d8da516d1688abe54d4ef",
					name: "Light novel",
				},
				images: [
					"https://salt.tikicdn.com/ts/product/01/93/08/61e928ce145c06a11a483ed49d826da2.jpg",
				],
			},
		],
	},
];

export default receipts;
