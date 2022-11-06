import "./navbar.scss";
import { icons } from "~/assets/images";
import { navbarOptions } from "./navbarOption.js";

import { Search } from "@mui/icons-material";
function Navbar() {
	return (
		<div className="navbar">
			<div className="wrapper">

				
				<div className="search">
					<input type="text" placeholder="" spellCheck={false} />
					<button className="btn-clear">
						{/** clear */}
					</button>
					<button className="btn-search">
						<Search />
					</button>
					{/** loadding */}
				</div>
				<div className="actions">
					{RenderOption()}
					<div className="item">
						<img
							src="https://i.pinimg.com/236x/62/9e/92/629e9282db7c2e44d4b6a1790952d11d.jpg"
							alt=""
							className="avatar"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function RenderOption() {
	return navbarOptions.map((option) => {
		let key = option.key;
		let text = option.text;
		if (key === "notification" || key === "chat") {
			return (
				<div className="item">
					{icons.Navbar[key]}
					<div className="counter">1</div>
				</div>
			);
		} else if (key !== "search") {
			return <div className="item">{icons.Navbar[key]}</div>;
		} else {
			return;
		}
	});
}


export default Navbar;
