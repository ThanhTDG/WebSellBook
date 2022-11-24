import properties from "./properties";
import { status, listBookStatus } from "./bookStatus";
import * as options from "./options";
const BookConfig = {
	props: properties,
	status: status,
	listStatus: listBookStatus,
	options: options,
};
export default BookConfig;
