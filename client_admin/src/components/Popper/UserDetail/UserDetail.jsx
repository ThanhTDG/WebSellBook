import classNames from "classnames/bind";
import React from "react";

import Tippy from "@tippyjs/react/headless";
import styles from "./userDetail.module.scss";
import Image from "~/components/Image";
import Controls from "~/components/controls";
import profileProp from "~/stores/Account/profileProps";
import { displaySex, displayTime } from "~/utils/display";
import { constants } from "~/stores";
import typeUser from "~/stores/types/typeUser";
import { useState } from "react";
import { useEffect } from "react";
import { getUserById } from "~/services/userService";
import Loading from "~/components/Loading";
const cx = classNames.bind(styles);
function UserDetail({ user: initState, id, useTippy = true, type = typeUser.customer, children }) {
	const [user, setUser] = useState(initState);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		if (id) {
			fetchApi();
		} else {
			setIsLoading(false);
		}
	}, []);
	const fetchApi = async () => {
		setIsLoading(true);
		const response = await getUserById(id);
		if (response) {
			setUser(response);
			setIsLoading(false);
		} else {
		}
	};
	return (
		<>
			{useTippy ? (
				<Tippy
					placement="bottom-start"
					interactive
					delay={[700, 200]}
					render={(attrs) => {
						return (
							<div className={cx("wrapper")}>
								<Loading isLoading={isLoading}>
									<UserMiniForm
										user={user}
										type={type}
									/>
								</Loading>
							</div>
						);
					}}
				>
					{children}
				</Tippy>
			) : (
				<div className={cx("wrapper")}>
					<Loading isLoading={isLoading}>
						<UserMiniForm
							user={user}
							type={type}
						/>
					</Loading>
				</div>
			)}
		</>
	);
}
function UserMiniForm({ user, type }) {
	let fail = Math.floor(Math.random() * 6);
	const getStatus = (value) => {
		if (value < 3) {
			return "normal";
		} else if (value < 5) {
			return "warning";
		} else {
			return "dangerous";
		}
	};
	console.log(fail, "fail");
	const handleDisplayType = (type) => {
		switch (type) {
			case typeUser.admin:
				return "Qu???n tr??? vi??n";
			case typeUser.customer:
				return "Kh??ch h??ng";
		}
	};
	let success = Math.floor(Math.random() * 2);
	return (
		<div className={cx("content")}>
			<div className={cx("header-content")}>
				<div className={cx("center")}>
					<div className={cx("background")}>
						<Image
							className={cx("avatar")}
							src={user.avatar}
						/>
					</div>
					<div className={cx("full-name")}>{user.fullName ? user.fullName : `${user.lastName} ${user.firstName}`}</div>
				</div>
				<div className={cx("type-user")}>
					<div
						className={cx("title-user", { customer: type === typeUser.customer }, { admin: type === typeUser.admin })}
					>
						{handleDisplayType(type)}
					</div>
				</div>
			</div>

			<div className={cx("body-content")}>
				<Row
					singleLine={true}
					name={"email"}
					title={profileProp.email.label}
					value={user.email}
				/>

				<div className={cx("division")}>
					<Row
						name={"phone"}
						title={profileProp.phone.shortLabel}
						value={user.phone}
					/>
					<Row
						name={"sex"}
						value={displaySex(user.sex)}
					/>
				</div>
				{type === typeUser.customer && (
					<>
						<div className={cx("division")}>
							<Row
								name={"bought"}
								title={profileProp.bought.shortLabel}
								value={"0"}
							/>
							<Row
								name={"failure"}
								title={profileProp.failure.shortLabel}
								value={fail}
								classNameValue={getStatus(fail)}
							/>
						</div>
						<Row
							name={"comment"}
							title={profileProp.comment.label}
							value={"0"}
						/>
					</>
				)}
				{user.lastSession && (
					<Row
						name={"lastSession"}
						title={constants.LAST_SESSION_SHORT}
						value={displayTime(user.lastSession)}
					/>
				)}
			</div>
		</div>
	);
}
function Row({ title, value, name, classNameValue, singleLine = false }) {
	return (
		<div className={cx("row", name)}>
			{title && <div className={cx("title")}>{`${title}:`}</div>}
			<div className={cx("value", { "single-line": singleLine }, classNameValue)}>{`${value}`}</div>
		</div>
	);
}

export default UserDetail;
