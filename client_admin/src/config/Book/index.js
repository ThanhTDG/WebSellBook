import properties from "./properties";
import { status, listBookStatus } from "./bookStatus";

const BookConfig = {
	props: properties,
	status: status,
	listStatus: listBookStatus,
};
export default BookConfig;
