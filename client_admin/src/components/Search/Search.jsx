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
	const { className = null, name, label, value, onChange } = props;
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
		<div className="wrapper">
			<Controls.Input
				label={label}
				classNames={cx("search-input")}
				onChange={handleSearch}
				value={search}
				endAdornment={<IconButton onClick={clearSearch}>{icons.Button("icon").close}</IconButton>}
			/>
		</div>
	);
}

export default Search;
