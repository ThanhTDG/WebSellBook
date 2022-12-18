import { List, ListItem, ListItemText, MenuList } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import React from "react";
import classNames from "classnames/bind";

import { constants } from "~/stores";
import styles from "./selectMenu.module.scss";
import * as Icons from "~/assets/images/icons";
import SearchBar from "~/components/SearchBar";

const cx = classNames.bind(styles);
function SelectMenu(props) {
	const { idSelect, options, disableFistItem = false, haveNewItem = true, onChange } = props;
	return (
		<div classNames={cx("")}>
			<SearchBar
				size="small"
				className={cx("search-bar")}
			/>
			<MenuList id="select-menu">
				{haveNewItem && (
					<MenuItem
						className={cx("menu-item", null === idSelect ? "menu-item-select" : "")}
						selected={null === idSelect}
						onClick={(e) => onChange(null)}
					>
						<div className={cx("add-role")}>
							<div className={cx("label-new-item")}>{constants.ADD_NEW}</div>
							{null === idSelect ? Icons.Button("").addBox : Icons.Button("").add}
						</div>
					</MenuItem>
				)}
				{options.map((option, index) => {
					return (
						<MenuItem
							className={cx("menu-item", option.id === idSelect ? "menu-item-select" : "")}
							key={option.id}
							disabled={disableFistItem ? 0 === index : false}
							selected={option.id === idSelect}
							onClick={(e) => onChange(option.id)}
						>
							{option.name}
						</MenuItem>
					);
				})}
			</MenuList>
		</div>
	);
}

export default SelectMenu;
