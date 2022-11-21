import React from "react";
import classNames from "classnames/bind";
import { Pagination } from "@mui/material";

import styles from "./footer.module.scss";
import Controls from "~/components/controls";

const cx = classNames.bind(styles);
function Footer(props) {
	const { limit, limitValue, onPageChange, pageValue, pageMax, onLimitChange } = props;
	return (
		<div className={cx("wrapper")}>
			<div className={cx("controls")}>
				<Controls.Select
					labelInside={true}
					size="small"
					className={cx("row-selector")}
					value={limitValue}
					onChange={onLimitChange}
					label={limit.title}
					items={limit.options}
				/>
				<Pagination
					showFirstButton
					showLastButton
					color="primary"
					size="large"
					count={pageMax}
					page={pageValue}
					onChange={onPageChange}
				/>
			</div>
		</div>
	);
}

export default Footer;
