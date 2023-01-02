import properties from "./properties";
import { status, listStatus } from "./customerStatus";
import * as options from "./options";
const adminConfig = {
	props: properties,
	status: status,
	listStatus: listStatus,
	options: options,
};
export default adminConfig;
