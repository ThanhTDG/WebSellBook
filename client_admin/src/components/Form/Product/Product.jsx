import React, { useState, useEffect, useLayoutEffect } from "react";
import { Box, FormControl } from "@mui/material";
import OutlinedBox from "~/components/OutlinedBox";
import useForm from "~/customHook/useForm";
import Controls from "~/components/controls/";
import Form from "~/components/Form";
import validate from "~/utils/validate";
import Button from "~/components/Button";
import classNames from "classnames/bind";
import styles from "./product.module.scss";
import { BookConfig } from "~/config/book";
import categories from "~/components/controls/DropdownTree/sampleData";
import Editor from "~/components/controls/Editor/Editor";

const cx = classNames.bind(styles);
const data = {
	label: "search me",
	value: "searchme",
	children: [
		{
			label: "search me too",
			value: "searchmetoo",
			children: [
				{
					label: "No one can get me",
					value: "anonymous",
				},
			],
		},
	],
};
const initialValues = {
	id: "634ed8e4f6a3a7266d992614",
	name: "OVERLORD - Tập 2",
	shortDescription: "OVERLORD - Tập 2: Chiến Binh Bóng Tối\n",
	description:
		'Vào ngày hoạt động cuối cùng của game YGGDRASIL, do hiện tượng bí ẩn nào đó, một người chơi là Momonga trong tạo hình nhân vật bộ xương tự nhiên bị dịch chuyển tới một thế giới xa lạ.\nĐã tám ngày trôi qua. Suốt tám ngày này, Momonga, giờ đổi tên thành Ainz, đã thăm thú toàn bộ lăng mộ Nazarick, xem xét tình hình các thuộc hạ của mình. Sau khi xác nhận rằng nơi đây chẳng khác mấy so với thế giới game, Ainz quyết định đã đến lúc tiến hành bước tiếp theo, là mở rộng phạm vi khám phá và chinh phục.\nDẫn theo một hầu gái hộ vệ, anh tìm đến thành phố trong vai trò người chuyên diệt quái, mà người ta vẫn gọi là "mạo hiểm giả".\n',
	slug: "overlord-tap-2",
	authors: "Maruyama Kugane",
	translators: "Mỹ Trinh",
	sku: "8935250704472",
	isbn13: "978-0134494166",
	isbn10: "0134494164",
	supplier: "IPM",
	publisher: "NXB Hồng Đức",
	publisherDate: "2020-04-30T00:00:00.000Z",
	images: ["https://cdn0.fahasa.com/media/catalog/product/o/v/overlord-2---bia1_1.jpg"],
	weight: 300,
	height: 18,
	width: 13,
	page: 426,
	bookCover: "Bìa mềm",
	status: "available",
	expectedDate: "2020-04-30T00:00:00.000Z",
	countInStock: 100,
	originalPrice: 135000,
	discountRate: 25,
	currentPrice: 100000,
	category: "63412da2f0dd862e790a187f",
};

function Product() {
	const { values, setValues, errors, setError, handleInputChange } = useForm(initialValues);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate.book) {
			window.alert("error");
		} else {
			window.alert("noError");
		}
	};
	const [languageBook, setLanguageBook] = useState(categories[0].id);
	const [category, setCategory] = useState([]);
	const handleLanguageBook = (e, value) => {
		setLanguageBook(value);
		setCategory(null);
	};

	const handleCategory = (e, node) => {
		if (node) {
			setCategory(node.value);
		} else {
			setCategory(null);
		}
	};
	console.log(values);
	useLayoutEffect(() => {
		setCategory(categories.find((item) => item.id === languageBook).children);
	}, [languageBook]);
	return (
		<Form onSubmit={handleSubmit}>
			<FormControl sx={{ width: 1 }}>
				<div className={cx("wrapper")}>
					<div className={cx("critical-information")}>
						<OutlinedBox title={BookConfig.criticalInformation.title}>
							<div className={cx("name")}>
								<Controls.Input
									label={BookConfig.name.title}
									name="name"
									value={values.name}
									onChange={handleInputChange}
									errors={errors.name}
								/>
							</div>
							<div className={cx("price")}>
								<Controls.Input
									label={BookConfig.originalPrice.title}
									name="originalPrice"
									type="number"
									configNumber={BookConfig.originalPrice.config}
									endAdornment={BookConfig.originalPrice.unit}
									value={values.originalPrice}
									onChange={handleInputChange}
									errors={errors.originalPrice}
								/>
								<Controls.Input
									label={BookConfig.discountRate.title}
									name="discountRate"
									configNumber={BookConfig.discountRate.config}
									endAdornment={BookConfig.discountRate.unit}
									type="number"
									value={values.discountRate}
									onChange={handleInputChange}
									errors={errors.discountRate}
								/>
								<Controls.Input
									label={BookConfig.price.title}
									name="price"
									type="number"
									configNumber={BookConfig.price.config}
									endAdornment={BookConfig.price.unit}
									value={values.price}
									onChange={handleInputChange}
									errors={errors.price}
								/>
							</div>
							<div className={cx("category")}>
								<OutlinedBox title={BookConfig.type.title} type={"small"}>
									<Controls.RadioGroup
										label={"Ngôn ngữ"}
										name="name"
										items={categories}
										value={languageBook}
										onChange={handleLanguageBook}
										errors={errors.name}
									/>
									{categories.map((item) => {
										return (
											item.id === languageBook && (
												<div key={item.id}>
													<Controls.DropdownTree
														label={BookConfig.category.title}
														name="name"
														items={item.children}
														onChange={handleCategory}
														errors={errors.name}
													/>
												</div>
											)
										);
									})}
								</OutlinedBox>
							</div>
						</OutlinedBox>
					</div>
					<div className={cx("details")}>
						<OutlinedBox title={BookConfig.details.title}>
							<div className={cx("authors")}>
								<Controls.Input
									label={BookConfig.authors.title}
									name="authors"
									value={values.authors}
									onChange={handleInputChange}
									errors={errors.authors}
								/>
							</div>
							<div className={cx("translators")}>
								<Controls.Input
									label={BookConfig.translators.title}
									name="translators"
									value={values.translators}
									onChange={handleInputChange}
									errors={errors.translators}
								/>
							</div>
							<div className={cx("sku")}>
								<Controls.Input
									label={BookConfig.sku.title}
									name="sku"
									value={values.sku}
									onChange={handleInputChange}
									errors={errors.sku}
								/>
							</div>
							<div className={cx("isbn13")}>
								<Controls.Input
									label={BookConfig.isbn13.title}
									name="isbn13"
									value={values.isbn13}
									onChange={handleInputChange}
									errors={errors.isbn13}
								/>
							</div>
							<div className={cx("isbn10")}>
								<Controls.Input
									label={BookConfig.isbn10.title}
									name="isbn10"
									value={values.isbn10}
									onChange={handleInputChange}
									errors={errors.isbn10}
								/>
							</div>
							<div className={cx("supplier")}>
								<Controls.Input
									label={BookConfig.supplier.title}
									name="supplier"
									value={values.supplier}
									onChange={handleInputChange}
									errors={errors.supplier}
								/>
							</div>
							<div className={cx("publisher")}>
								<Controls.Input
									label={BookConfig.publisher.title}
									name="publisher"
									value={values.publisher}
									onChange={handleInputChange}
									errors={errors.publisher}
								/>
							</div>
							<div className={cx("publisherDate")}>
								<Controls.DatePicker
									label={BookConfig.publisherDate.title}
									name="publisherDate"
									value={values.publisherDate}
									onChange={handleInputChange}
								/>
							</div>
							<div className={cx("expectedDate")}>
								<Controls.DatePicker
									label={BookConfig.expectedDate.title}
									name="expectedDate"
									value={values.expectedDate}
									onChange={handleInputChange}
								/>
							</div>
							<OutlinedBox title={BookConfig.specification.title} type={"small"}>
								<Controls.Input
									label={BookConfig.weight.title}
									name="weight"
									value={values.weight}
									onChange={handleInputChange}
									errors={errors.weight}
								/>
								<Controls.Input
									label={BookConfig.height.title}
									name="height"
									value={values.height}
									onChange={handleInputChange}
									errors={errors.height}
								/>
								<Controls.Input
									label={BookConfig.width.title}
									name="width"
									value={values.width}
									onChange={handleInputChange}
									errors={errors.width}
								/>
								<Controls.Input
									label={BookConfig.page.title}
									name="page"
									value={values.page}
									onChange={handleInputChange}
									errors={errors.page}
								/>
								<Controls.Input
									label={BookConfig.bookCover.title}
									name="bookCover"
									value={values.bookCover}
									onChange={handleInputChange}
									errors={errors.bookCover}
								/>
							</OutlinedBox>
						</OutlinedBox>

						<OutlinedBox title={BookConfig.descNImage.title}>
							<Controls.Textarea
								label={BookConfig.description.title}
								name="description"
								value={values.description}
								onChange={handleInputChange}
								errors={errors.description}
							/>
						</OutlinedBox>
					</div>
					<Button primary type="submit">
						Xác nhận
					</Button>
				</div>
			</FormControl>
		</Form>
	);
}

export default Product;
