import React from "react";
import axios from "axios";
import Button from "~/components/controls/Button";
import InfoLayout from "~/layouts/InfoLayout";
import "./testlayout.scss";
import AccountAdminPage from "../UserAccount/AccountAdminPage";
import Popper from "~/components/Popper";
import { Link } from "react-router-dom";
import ItemOrder from "~/components/Items/ItemOrderFull/ItemOrderFull";
import ReceiptPage from "../Receipt/ReceiptPage/ReceiptPage";
import TabAdmin from "~/components/tab/TabAdmin";
function TestLayout() {
	return <TabAdmin></TabAdmin>;
}

export default TestLayout;
