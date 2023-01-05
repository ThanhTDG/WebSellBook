const profileProp = {
	firstName: {
		label: "Tên",
		desc: "Khoảng n ký tự đóa",
		required: true,
		config: { min: "0", max: "100", step: "1" },
	},
	lastName: {
		label: "Họ và tên đệm",
		desc: "Khoảng n ký tự đóa",
		required: true,
		config: { min: "0", max: "100", step: "1" },
	},
	fullName: {
		label: "Họ và tên",
		desc: "Khoảng n ký tự đóa",
		required: true,
		config: { min: "0", max: "100", step: "1" },
	},
	email: { label: "Email", desc: "Khoảng n ký tự đóa", required: true, config: { min: "0", max: "100", step: "1" } },
	phone: {
		label: "Số điện thoại",
		shortLabel: "SDT",
		desc: "Khoảng n ký tự đóa",
		required: true,
		config: { min: "0", max: "100", step: "1" },
	},
	sex: { label: "Giới tính", desc: "Khoảng n ký tự đóa", required: true, config: { min: "0", max: "100", step: "1" } },
	birthday: {
		label: "Ngày sinh",
		desc: "Khoảng n ký tự đóa",
		required: true,
		config: { min: "0", max: "100", step: "1" },
	},
	avatar: {
		label: "Ảnh đại diện",
		desc: "Khoảng n ký tự đóa",
		required: true,
		config: { min: "0", max: "100", step: "1" },
	},
	roles: {
		label: "Các vai trò",
		desc: "Khoảng n ký tự đóa",
		required: true,
		config: { min: "0", max: "100", step: "1" },
	},
	bought: {
		label: "Số lượng đơn hàng",
		shortLabel: "Thành công",
		desc: "Khoảng n ký tự đóa",
		required: true,
		config: { min: "0", max: "100", step: "1" },
	},
	failure: {
		label: "Số đơn thất bại",
		shortLabel: "Thất bại",
		desc: "Khoảng n ký tự đóa",
		required: true,
		config: { min: "0", max: "100", step: "1" },
	},
	comment: {
		label: "Lượt bình luận",
		shortLabel: "",
		desc: "Khoảng n ký tự đóa",
		required: true,
		config: { min: "0", max: "100", step: "1" },
	},
};
export default profileProp;
