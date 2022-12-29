import React from "react";
import axios from "axios";
import Button from "~/components/controls/Button";
import InfoLayout from "~/layouts/InfoLayout";
import "./testlayout.scss";
import AccountAdminPage from "../UserAccount/AccountAdminPage";
import Popper from "~/components/Popper";
import { Link } from "react-router-dom";
function TestLayout() {
	return (
		<Popper.CustomerDetail
			customer={{
				id: "634e8609071be9c0c9f52ca7",
				firstName: "An",
				lastName: "Nguyễn Văn",
				fullName: "Lê Hoàng Hiếu Nghĩa Đệ Nhất Thương Tâm Nhân",
				email: "an@gmail.example.com",
				phone: "0987654321",
				sex: true,
				birthday: "2001-01-01T00:00:00.000Z",
				avatar: "https://ui-avatars.com/api/?name=An&background=random&color=random&length=1&size=96",
				roles: [
					{
						_id: "638c76f64700d09a7fde9be3",
						name: "admin",
					},
				],
				lastSession: "2022-11-10T00:00:00.000Z",
				createdDate: "2022-11-01T00:00:00.000Z",
				updatedDate: "2022-11-02T00:00:00.000Z",
			}}
		>
			<Link to={"test"}>ABCD</Link>
		</Popper.CustomerDetail>
	);
}

export default TestLayout;
