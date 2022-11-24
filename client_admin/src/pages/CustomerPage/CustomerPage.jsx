import * as React from "react";
import Controls from "~/components/controls/";
import classNames from "classnames/bind";

import TabsCustomer from "~/components/tab/TabCustomer";
import { ProductMgtProvider } from "~/stores";
import globalStyles from "~/pages/stylePages/pagesTabTable.module.scss";
import localStyles from "./customerPage.module.scss";
import PageConfig from "~/stores/pages";
import { getKey } from "~/utils/util";
const gcx = classNames.bind(globalStyles);
const lcx = classNames.bind(localStyles);
function CustomerPage() {
	let key = getKey("route", window.location.pathname);
	let label = "";
	if (key) {
		label = PageConfig[key].label;
	}
	return (
		<div className={gcx("wrapper")}>
			<div className={gcx("future-manager")}>
				<h2>{label}</h2>
			</div>
			<div className={gcx("content")}>
				<TabsCustomer />
			</div>
		</div>
	);
}

export default CustomerPage;
