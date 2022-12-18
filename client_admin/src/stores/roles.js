const roles = {
	all: {
		all: {
			id: "638c7606e13b091e37dd84d3",
			name: "Toàn quyền quản lý tất cả các thành phần",
			desc: "Quyền hạn cho phép quản lý gồm thêm(tạo),xem chi tiết, cập nhật(chỉnh sửa), xóa(gỡ bỏ), thống kê tất cả  tạo các thành phần trong trang web như : danh mục, sách, hóa đơn, vai trò, người quản trị, khách hàng, người dùng (Nguy hiểm vai trò này có toàn quyền kiểm soát hệ thống)",
			dangerous: 1,
		},
		create: {
			id: "638c7606e13b091e37dd84d4",
			name: "Tạo tất cả các thành phần",
			desc: "Quyền hạn cho phép thêm hoặc tất cả  tạo các thành phần trong trang web như : danh mục, sách, hóa đơn, vai trò, người quản trị, khách hàng, người dùng",
			dangerous: 2,
		},
		view: {
			id: "638c7606e13b091e37dd84d5",
			name: "Xem chi tiết tất cả",
			desc: "Quyền hạn cho phép xem chi tiết tất cả các thành phần trong trang web như : danh mục, sách, hóa đơn, vai trò, người quản trị, khách hàng, người dùng",
			dangerous: 2,
		},
		update: {
			id: "638c7606e13b091e37dd84d6",
			name: "Cập nhật tất cả",
			desc: "Quyền hạn cho phép cập nhật, chỉnh sửa  tất cả các thành phần trong trang web như : danh mục, sách, hóa đơn, vai trò, người quản trị, khách hàng, người dùng, (Nguy hiểm vai trò này có toàn quyền kiểm soát hệ thống)",
			dangerous: 2,
		},
		delete: {
			id: "638c7606e13b091e37dd84d7",
			name: "Xóa tất cả",
			desc: "Quyền hạn cho phép xóa các thành phần trong trang web như : danh mục, sách, hóa đơn, vai trò, người quản trị, khách hàng, người dùng",
			dangerous: 1,
		},
		statistic: {
			id: "638c7606e13b091e37dd84d8",
			name: "Thống kê tất cả",
			desc: "Quyền hạn cho phép xem các thống kê các thành phần các thành phần trong trang web như : danh mục, sách, hóa đơn, vai trò, người quản trị, khách hàng, người dùng",
			dangerous: 3,
		},
	},
	category: {
		all: {
			id: "638c7606e13b091e37dd84d9",
			name: "Toàn quyền quản lý danh mục",
			desc: "Quyền hạn cho phép quản lý danh mục như : thêm (tạo),xem chi tiết, cập nhật(chỉnh sửa), xóa(gỡ bỏ), thống kê danh mục (Mức độ nguy hiểm cao: vì bao gồm quyền xóa có thể gây ảnh đến hệ thống)",
			dangerous: 1,
		},
		create: {
			id: "638c7606e13b091e37dd84da",
			name: "Tạo danh mục",
			desc: "Quyền hạn cho phép tạo danh mục để quản lý các cuốn sách. Nhằm phân loại và quản lý sách và khách hàng có thể tìm kiếm dễ dàng.",
			dangerous: 3,
		},
		view: {
			id: "638c7606e13b091e37dd84db",
			name: "Xem chi tiết danh mục",
			desc: "Quyền hạn cho phép xem chi tiết thông tin danh mục để quản lý các cuốn sách. Nhằm giúp việc phân loại và quản lý sách đơn giản và khách hàng có thể tìm kiếm dễ dàng.",
			dangerous: 3,
		},
		update: {
			id: "638c7606e13b091e37dd84dc",
			name: "Cập nhật danh mục",
			desc: "Quyền hạn cho phép cập nhật thông tin danh mục để quản lý các cuốn sách. Nhằm giúp việc phân loại và quản lý sách đơn giản và khách hàng có thể tìm kiếm dễ dàng.",
			dangerous: 3,
		},
		delete: {
			id: "638c7606e13b091e37dd84dd",
			name: "Xóa danh mục",
			desc: "Quyền hạn cho phép xóa danh mục để quản lý các cuốn sách. Nhằm giúp việc phân loại và quản lý sách đơn giản và khách hàng có thể tìm kiếm dễ dàng.(Mức độ nguy hiểm cao: vì bao gồm quyền xóa có thể gây ảnh đến hệ thống)",
			dangerous: 2,
		},
		statistic: {
			id: "638c7606e13b091e37dd84de",
			name: "Thống kê danh mục",
			desc: "Quyền hạn cho phép xem thống kê danh mục. Nhằm giúp việc phân loại và quản lý, đánh giá đơn giản và khách hàng có thể tìm kiếm dễ dàng.",
			dangerous: 3,
		},
	},
	product: {
		all: {
			id: "638c7606e13b091e37dd84df",
			name: "Toàn quyền quản lý sách",
			desc: "Quyền hạn cho phép quản lý những cuốn sách trong hệ thống như : thêm (tạo),xem chi tiết, cập nhật(chỉnh sửa), xóa(gỡ bỏ), thống kê những thông số liên quan đến sách trong hệ thống (Mức độ nguy hiểm cao: vì bao gồm quyền xóa sách có thể gây ảnh đến hệ thống)",
			dangerous: 1,
		},
		create: {
			id: "638c7606e13b091e37dd84e0",
			name: "Tạo sách",
			desc: "Quyền hạn cho phép tạo cuốn sách gồm các thông tin sách như: các thông tin quan trọng gồm tên, danh mục, ... cũng như các thông tin bổ sung cuối cùng là hình ảnh và mô tả dành cho cuốn sách đó. (Mức độ nguy hiểm cao: vì bao gồm quyền xóa cuốn sách khỏi hệ thống có thể gây ảnh đến hệ thống)",
			dangerous: 3,
		},
		view: {
			id: "638c7606e13b091e37dd84e3",
			name: "Xem chi tiết sách",
			desc: "Quyền hạn cho phép xem các thông tin quan trọng gồm tên, danh mục, ... cũng như các thông tin bổ sung cuối cùng là hình ảnh và mô tả dành cho cuốn sách đó và các thông tin khác.",
			dangerous: 3,
		},
		update: {
			id: "638c7606e13b091e37dd84e2",
			name: "Cập nhật sách",
			desc: "Quyền hạn cho phép cập nhật thông tin sách như: các thông tin quan trọng gồm tên, danh mục, ... các thông tin bổ sung cuối cùng là hình ảnh và mô tả dành cho cuốn sách đó.",
			dangerous: 3,
		},
		delete: {
			id: "638c7606e13b091e37dd84e3",
			name: "Xóa sách",
			desc: "Quyền hạn cho phép xóa cuốn sách khỏi hệ thống những thông tin xóa gồm: các thông tin quan trọng gồm tên, ... các thông tin bổ sung hình ảnh và mô tả dành cho cuốn sách đó.(Mức độ nguy hiểm cao: vì xóa cuốn sách có thể gây ảnh đến hệ thống)",
			dangerous: 2,
		},
		statistic: {
			id: "638c7606e13b091e37dd84e4",
			name: "Thống kê sách",
			desc: "Quyền hạn cho phép xem thống kê các cuốn sách có trong hệ thống.",
			dangerous: 3,
		},
	},
	order: {
		all: {
			id: "638c7606e13b091e37dd84e5",
			name: "Toàn quyền quản lý hóa đơn",
			desc: "Quyền hạn cho phép quản lý hóa đơn được tạo ra trong hệ thống như : thêm (tạo),xem chi tiết, cập nhật(chỉnh sửa), xóa(gỡ bỏ), thống kê những thông số liên quan đến hóa đơn trong hệ thống (Mức độ nguy hiểm cao: vì bao gồm quyền xóa hóa đơn có thể gây ảnh đến hệ thống)",
			dangerous: 1,
		},
		create: {
			id: "638c7606e13b091e37dd84e6",
			name: "Tạo hóa đơn",
			desc: "Quyền hạn cho phép tạo hóa đơn gồm các thông tin hóa đơn như: các thông tin quan trọng gồm địa chỉ người nhận, số tiền, sản phẩm trong cũng như các thông tin bổ sung..",
			dangerous: 3,
		},
		view: {
			id: "638c7606e13b091e37dd84e7",
			name: "Xem chi tiết hóa đơn",
			desc: "Quyền hạn cho phép xem hóa đơn gồm các thông tin hóa đơn như: các thông tin quan trọng gồm địa chỉ người nhận, số tiền, sản phẩm, trạng thái các hóa đơn.",
			dangerous: 3,
		},
		update: {
			id: "638c7606e13b091e37dd84e8",
			name: "Cập nhật hóa đơn",
			desc: "Quyền hạn cho phép cập nhật hóa đơn gồm các thông tin hóa đơn như: các thông tin quan trọng gồm địa chỉ người nhận, số tiền, sản phẩm trong cũng như trạng thái của hóa đơn.",
			dangerous: 3,
		},
		delete: {
			id: "638c7606e13b091e37dd84e9",
			name: "Xóa hóa đơn",
			desc: "Quyền hạn cho phép xóa hóa đơn gây mất thông tin về hóa đơn đó gồm các thông tin hóa đơn như: các thông tin quan trọng gồm địa chỉ người nhận, số tiền, sản phẩm trong cũng như trạng thái của hóa đơn.(Mức độ nguy hiểm cao: vì có thể gây ảnh hưởng đến hệ thống)",
			dangerous: 2,
		},
		statistic: {
			id: "638c7606e13b091e37dd84ea",
			name: "Thống kê hóa đơn",
			desc: "Quyền hạn cho phép xem thống kê các hóa đơn được xử lý trong hệ thống",
			dangerous: 3,
		},
	},
	role: {
		all: {
			id: "638c7606e13b091e37dd84eb",
			name: "Toàn quyền quản lý vai trò",
			desc: "Quyền hạn cho phép quản lý vai trò trong hệ thống như : thêm (tạo),xem chi tiết, cập nhật(chỉnh sửa), xóa(gỡ bỏ), thống kê vai trò trong hệ thống (Mức độ nguy hiểm cao: vì bao gồm quyền thêm, sửa, xóa gây ảnh đến đến người quản trị hệ thống)",
			dangerous: 1,
		},
		create: {
			id: "638c7606e13b091e37dd84ec",
			name: "Tạo vai trò",
			desc: "Quyền hạn chó phép",
			dangerous: 2,
		},
		view: {
			id: "638c7606e13b091e37dd84ed",
			name: "Xem chi tiết vai trò",
			desc: "Quyền hạn chó phép",
			dangerous: 2,
		},
		update: {
			id: "638c7606e13b091e37dd84ee",
			name: "Cập nhật vai trò",
			desc: "Quyền hạn chó phép",
			dangerous: 2,
		},
		delete: {
			id: "638c7606e13b091e37dd84ef",
			name: "Xóa vai trò",
			desc: "Quyền hạn chó phép",
			dangerous: 2,
		},
		statistic: {
			id: "638c7606e13b091e37dd84f0",
			name: "Thống kê vai trò",
			desc: "Quyền hạn chó phép",
			dangerous: 3,
		},
	},
	admin: {
		all: {
			id: "638c7606e13b091e37dd84f7",
			name: "Toàn quyền quản lý người quản trị",
			desc: "Quyền hạn chó phép",
			dangerous: 1,
		},
		create: {
			id: "638c7606e13b091e37dd84f8",
			name: "Tạo người quản trị",
			desc: "Quyền hạn chó phép",
			dangerous: 3,
		},
		view: {
			id: "638c7606e13b091e37dd84f9",
			name: "Xem chi tiết người quản trị",
			desc: "Quyền hạn chó phép",
			dangerous: 3,
		},
		update: {
			id: "638c7606e13b091e37dd84fa",
			name: "Cập nhật người quản trị",
			desc: "Quyền hạn chó phép",
			dangerous: 3,
		},
		delete: {
			id: "638c7606e13b091e37dd84fb",
			name: "Xóa người quản trị",
			desc: "Quyền hạn chó phép",
			dangerous: 2,
		},
		statistic: {
			id: "638c7606e13b091e37dd84fc",
			name: "Thống kê người quản trị",
			desc: "Quyền hạn chó phép",
			dangerous: 3,
		},
	},
	customer: {
		all: {
			id: "638c7606e13b091e37dd84fd",
			name: "Toàn quyền quản lý khách hàng",
			desc: "Quyền hạn chó phép",
			dangerous: 1,
		},
		create: {
			id: "638c7606e13b091e37dd84fe",
			name: "Tạo khách hàng",
			desc: "Quyền hạn chó phép",
			dangerous: 3,
		},
		view: {
			id: "638c7606e13b091e37dd84ff",
			name: "Xem chi tiết khách hàng",
			desc: "Quyền hạn chó phép",
			dangerous: 3,
		},
		update: {
			id: "638c7606e13b091e37dd8500",
			name: "Cập nhật khách hàng",
			desc: "Quyền hạn chó phép",
			dangerous: 3,
		},
		delete: {
			id: "638c7606e13b091e37dd8503",
			name: "Xóa khách hàng",
			desc: "Quyền hạn chó phép",
			dangerous: 2,
		},
		statistic: {
			id: "638c7606e13b091e37dd8502",
			name: "Thống kê khách hàng",
			desc: "Quyền hạn chó phép",
			dangerous: 3,
		},
	},
	user: {
		all: {
			id: "638c7606e13b091e37dd84f3",
			name: "Toàn quyền quản lý người dùng",
			desc: "Quyền hạn chó phép",
			dangerous: 1,
		},
		create: {
			id: "638c7606e13b091e37dd84f2",
			name: "Tạo người dùng",
			desc: "Quyền hạn chó phép",
			dangerous: 3,
		},
		view: {
			id: "638c7606e13b091e37dd84f3",
			name: "Xem chi tiết người dùng",
			desc: "Quyền hạn chó phép",
			dangerous: 3,
		},
		update: {
			id: "638c7606e13b091e37dd84f4",
			name: "Cập nhật người dùng",
			desc: "Quyền hạn chó phép",
			dangerous: 3,
		},
		delete: {
			id: "638c7606e13b091e37dd84f5",
			name: "Xóa người dùng",
			desc: "Quyền hạn chó phép",
			dangerous: 2,
		},
		statistic: {
			id: "638c7606e13b091e37dd84f6",
			name: "Thống kê người dùng",
			desc: "Quyền hạn chó phép",
			dangerous: 3,
		},
	},
};
const actions = {
	all: "all",
	create: "create",
	view: "view",
	update: "update",
	delete: "delete",
	statistic: "statistic",
};
const types = {
	all: "all",
	category: "category",
	product: "product",
	order: "order",
	role: "role",
	admin: "admin",
	customer: "customer",
	user: "user",
};

export { roles, actions, types };
