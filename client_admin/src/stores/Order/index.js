import properties from "./properties";
import { status, listStatus } from "./statuses";
import * as options from "./options";
const orderConfig = {
	props: properties,
	status: status,
	listStatus: listStatus,
	options: options,
};
export default orderConfig;
