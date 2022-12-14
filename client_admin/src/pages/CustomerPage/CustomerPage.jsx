import * as React from "react";

import TabsCustomer from "~/components/tab/TabCustomer";
import LayoutHeaderButton from "~/layouts/LayoutHeaderButton";

function CustomerPage() {
	return (
		<LayoutHeaderButton>
			<TabsCustomer />
		</LayoutHeaderButton>
	);
}

export default CustomerPage;
