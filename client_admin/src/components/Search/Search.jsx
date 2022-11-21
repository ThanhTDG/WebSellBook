import { IconButton } from "@mui/material";
import classNames from "classnames/bind";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { icons } from "~/assets/images";
import Controls from "../controls";
import styles from "./search.module.scss";
const cx = classNames.bind(styles);

function Search(props) {
	const { className = null, label = "Tìm kiếm", value = "", onChange, size = "normal" } = props;
	const [search, setSearch] = useState(value);
	const inputRef = useRef();
	const handleSearch = (e) => {
		let value = e.target.value;
		if (!(value.length === 1 && value === " ")) {
			setSearch(value);
		}
	};
	const clearSearch = (e) => {
		setSearch("");
	};
	return (
		<div className={cx("wrapper", className)}>
			<Controls.Input
				placeholder={"Tìm kiếm"}
				size={size}
				classNames={cx("search-input")}
				onChange={handleSearch}
				value={search}
				endAdornment={search && <IconButton onClick={clearSearch}>{icons.Button("icon").close}</IconButton>}
				startAdornment={icons.Button("icon").search}
			/>
		</div>
	);
}

export default Search;
