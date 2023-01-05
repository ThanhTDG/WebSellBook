import banners from "./bannner";
const images = {
	logo: require("./LogoOnly.svg").default,
	logoAndText: require("./LogoAndText.svg").default,
	logoAndTextColor: require("./LogoAndTextColor.svg").default,
	noImage: require("./noImage.png"),
	star: require("./star.png"),
	banners: banners,
};
export default images;
export * as icons from "./icons";
