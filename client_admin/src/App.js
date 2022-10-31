import { BrowserRouter, Routes, Route } from "react-router-dom";
import { privateRoutes } from "~/routes/index.js";
import { DefaultLayout } from "~/components/layout";
import { Fragment } from "react";
function App() {
	return (
		<div className="App">
			<div className="AppGlass">
				<BrowserRouter>
					<Routes>
						{privateRoutes.map((route, index) => {
							const Page = route.component;
							let Layout = DefaultLayout;
							if (route.layout) {
								Layout = route.layout;
							} else if (route.layout === null) {
								Layout = Fragment;
							}
							return (
								<Route
									key={index}
									path={route.path}
									element={
										<Layout>
											<Page />
										</Layout>
									}
								/>
							);
						})}
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);
}

export default App;
