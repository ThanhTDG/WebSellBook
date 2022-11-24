import TabPanel from "~/components/tab/TabPanel";
import { TitleTabProducts } from "./TitleTabProducts";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TableProduct } from "~/components/table/Product";
import { useProductMgt, actions } from "~/stores";
import { SelectNumberOfRows } from "~/components/Widget";
import styles from "./tabProduct.module.scss";
import classNames from "classnames/bind";
import { limitRowsBook } from "~/stores/table";
import { Paper } from "@mui/material";

const cx = classNames.bind(styles);

function TabProduct() {
	const [state, dispatch] = useProductMgt();
	const handleSwitchTab = (e, tabSelected) => {
		dispatch(actions.setTabMgtProduct(tabSelected));
	};

	console.log(state);
	return (
		<div className={cx("wrapper")}>
			<div className={cx("title-tab")}>
				<Tabs
					sx={{ borderBottom: 1, borderColor: "divider" }}
					value={state.selectTab}
					onChange={handleSwitchTab}
					aria-label="basic tabs example"
					variant="scrollable"
					scrollButtons
					allowScrollButtonsMobile
				>
					{TitleTabProducts.map((title, index) => {
						consolt.log(title);
						return (
							<Tab
								sx={{ fontSize: "subtitle1.fontSize" }}
								key={"label-tab-product-" + index}
								label={title.nameVN}
							/>
						);
					})}
				</Tabs>
			</div>
			<Paper className={cx("content-tab")}>
				{TitleTabProducts.map((title, index) => {
					consolt.log(title);
					// return (
					// 	<TabPanel
					// 		value={state.selectTab}
					// 		index={index}
					// 	>
					// 		<h1>{title.nameVN}</h1>
					// 		<TableProduct />
					// 	</TabPanel>
					// );
				})}
			</Paper>
		</div>
	);
}

export default TabProduct;
