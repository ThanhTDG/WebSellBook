import React from "react";
import { ImageList as ImageListMui, ImageListItem } from "@mui/material";
function ImageList(props) {
	const { itemData } = props;
	return (
		<ImageListMui sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
			{itemData.map((item) => (
				<ImageListItem key={item.img}>
					<img
						src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
						srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
						alt={item.title}
						loading="lazy"
					/>
				</ImageListItem>
			))}
		</ImageListMui>
	);
}

export default ImageList;
