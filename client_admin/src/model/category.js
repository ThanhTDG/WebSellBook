class Category {
	constructor(id, name, slug) {
		this.id = id;
		this.name = name;
		this.slug = slug;
		this.children = null;
	}
}

export { Category };
