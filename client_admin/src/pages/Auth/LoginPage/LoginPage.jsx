import React from "react";
import classNames from "classnames/bind";

import LoginForm from "~/components/Form/LoginForm";
import styles from "./loginPage.module.scss";
import OutlinedBox from "~/components/OutlinedBox";
import Banner from "~/components/Banner";
import HeaderComp from "~/components/HeaderComp";

const cx = classNames.bind(styles);
function LoginPage() {
	return (
		<div className={cx("wrapper")}>
			<div className={cx("outline-box")}>
				<OutlinedBox>
					<HeaderComp className={cx("header")} />
					<div className={cx("content")}>
						<div className={cx("left")}>
							<LoginForm />
						</div>
						<div className={cx("right")}>
							<Banner />
						</div>
					</div>
				</OutlinedBox>
			</div>
		</div>
	);
}

export default LoginPage;
