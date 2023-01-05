const properties = {
	initialValues: {
		id: "",
		name: "",
		category: null,
		description: "",
		authors: "",
		translators: "",
		sku: "",
		isbn13: "",
		isbn10: "",
		supplier: "",
		publisher: "",
		publisherDate: "",
		images: [],
		weight: null,
		height: null,
		width: null,
		page: null,
		bookCover: null,
		status: "available",
		expectedDate: null,
		countInStock: 0,
		originalPrice: 0,
		discountRate: 0,
	},

	language: {
		title: "Ngôn ngữ",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	criticalInformation: {
		title: "Thông tin quan trọng",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	type: {
		title: "Thể loại",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	specification: {
		title: "Thông số kỹ thuật",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},

	details: {
		title: "Thông tin chi tiết",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	name: {
		title: "Tên sách",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	category: {
		title: "Danh mục",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	originalPrice: {
		title: "Giá gốc",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "999999999999", step: "100" },
	
	},
	price: {
		title: "Giá",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "999999999999", step: "100" },
	
	},
	discountRate: {
		title: "Tỉ lệ giảm giá",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	authors: {
		title: "Tác giả",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	translators: {
		title: "Dịch giả",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	sku: {
		title: "SKU",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	isbn10: {
		title: "ISBN 10",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	isbn13: {
		title: "ISBN 13",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	supplier: {
		title: "Nhà cung cấp",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	publisher: {
		title: "Nhà xuất bản",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	publisherDate: {
		title: "Ngày xuất bản",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	weight: {
		title: "Cân nặng",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	height: {
		title: "Chiều cao",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	width: {
		title: "Chiều rộng",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	page: {
		title: "Số trang",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	bookCover: {
		title: "Loại bìa",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	expectedDate: {
		title: "Ngày dự kiến",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	status: {
		title: "Trạng thái",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
		optionNew: [
			{ id: "isActive", name: "Đã có trong kho" },
			{ id: "comingSoon", name: "Chưa có trong kho" },
		],
	
	},
	countInStock: {
		title: "Số lượng hàng trong kho",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},

	descNImage: {
		title: "Mô tả và hình ảnh",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},

	description: {
		title: "Mô tả",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
	images: {
		title: "Danh sách ảnh",
		desc: "Khoảng n ký tự đóa",
		require: true,
		config: { min: "0", max: "100", step: "1" },
	
	},
};

export default properties;
