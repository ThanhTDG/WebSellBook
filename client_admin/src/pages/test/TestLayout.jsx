import React from "react";
import axios from "axios";
import Button from "~/components/controls/Button";
import InfoLayout from "~/layouts/InfoLayout";
import "./testlayout.scss";
function TestLayout() {
	const url = "https://toi-mua-sach.herokuapp.com";
	const instance = axios.create({
		baseURL: `${url}/api`,
		withCredentials: true,
	});
	const login = async () => {
		const res = await instance.post("/auth/signin", {
			username: "khachhang@example.com",
			password: "1234abcd",
		});
	};

	const profile = async () => {
		const res = await instance.get("/auth/profile");
	};
	return (
		<InfoLayout>
			<div>
				<Button
					primary
					onClick={login}
				>
					Login
				</Button>
				<div className={"test-text"}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet mauris mattis, egestas lacus ut, congue
					est. Nunc vulputate erat quis nulla suscipit, non convallis mi varius. Phasellus cursus rutrum felis, eget
					ullamcorper est. Curabitur vel posuere magna. Aenean pellentesque laoreet est, a pulvinar metus porta sed.
					Maecenas malesuada ac nisi sed porttitor. Nulla sit amet tellus leo. Proin ac felis a elit tempor tempor. Duis
					auctor accumsan dignissim. Curabitur in volutpat nisl, sed tristique massa. Suspendisse potenti. Maecenas
					dignissim sagittis erat quis consequat. Proin mattis eget sapien elementum mattis. Curabitur sit amet
					hendrerit lacus. Nulla sagittis mattis quam sodales convallis. Sed molestie nibh non elementum consectetur.
					Proin odio quam, ultricies quis nisi sit amet, accumsan fermentum ipsum. Fusce auctor eros ac porttitor
					bibendum. Maecenas eros ex, aliquam at interdum ac, laoreet ut nunc. Aliquam pharetra blandit consequat.
					Pellentesque luctus ornare erat, et finibus lorem semper pellentesque. Donec dignissim, ligula eget aliquam
					faucibus, massa libero pellentesque lorem, et ullamcorper dui felis sollicitudin nibh. Pellentesque nisi nisi,
					consequat sit amet nisi non, lobortis ullamcorper erat. Curabitur quis bibendum ante. Aenean consequat tellus
					sit amet ante pellentesque, laoreet congue nisi consequat. Suspendisse potenti. Aliquam feugiat euismod arcu
					nec tempus. Morbi consectetur ultricies magna, a accumsan justo ornare vitae. Proin mollis pellentesque
					porttitor. Proin vitae dui nisi. Proin tristique urna quam. Quisque sit amet eros ultrices, tristique est
					scelerisque, dignissim lorem. Phasellus a nisl sed libero finibus vulputate. Phasellus gravida lobortis dui,
					viverra consectetur nisl sodales at. Vestibulum ullamcorper consectetur ligula, nec euismod risus vulputate
					id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras tempor
					sagittis feugiat. In hac habitasse platea dictumst. Aliquam gravida dolor at tellus sagittis volutpat. Donec
					quis scelerisque nunc, eu placerat leo. Sed eget tortor blandit, molestie lacus vitae, egestas tortor. Donec
					vel quam finibus, fringilla turpis id, suscipit nunc. Maecenas venenatis erat ac arcu tempus, non auctor
					sapien blandit. Praesent rutrum, enim a molestie sollicitudin, magna nisl gravida dui, vel tempus tortor urna
					nec dolor. In hac habitasse platea dictumst. Maecenas rhoncus molestie varius. Mauris aliquam lacus quis
					cursus imperdiet. Phasellus tincidunt nisl massa. Quisque mattis, nibh eget facilisis ornare, velit neque
					efficitur libero, eget lacinia lectus arcu non mi. Quisque eu mi rhoncus, maximus velit at, aliquet sem. Nunc
					non gravida justo. Donec ultricies est vitae dui tempor, at tempus leo elementum. Praesent sit amet tortor in
					velit malesuada ultrices tincidunt vel enim. Proin eget velit et magna molestie elementum. Orci varius natoque
					penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam condimentum leo eros, sit amet
					laoreet tortor cursus eget. Aenean vestibulum, diam eget tempus tincidunt, libero tellus pretium elit, vel
					volutpat enim mi at turpis. Praesent eu fermentum diam, eget fermentum sem. Maecenas at posuere lectus.
					Quisque rutrum velit non eros lacinia condimentum. Duis pretium enim vitae mauris porta vehicula. Quisque ut
					vehicula dui. Integer convallis nisi sed orci gravida aliquet. Sed sit amet sollicitudin arcu. Vivamus
					dignissim ante non sapien ornare dignissim. Aenean laoreet eu libero id cursus. Suspendisse porttitor sem
					metus, in volutpat leo malesuada ac. Praesent dolor enim, vehicula id aliquam nec, tempor tincidunt felis.
					Quisque massa massa, sollicitudin quis quam sed, dapibus vestibulum lacus. Praesent congue tristique risus ut
					suscipit. Sed nec arcu consequat ipsum commodo iaculis nec a metus. Aenean pharetra elit sit amet imperdiet
					maximus. Pellentesque sed suscipit sem. Morbi aliquet risus id metus porttitor fermentum. Vivamus scelerisque
					porttitor iaculis. Vestibulum finibus convallis eros id ultrices. Proin consequat mauris in lacus sagittis
					posuere in nec risus. Duis vitae orci nisi. Cras vehicula purus sit amet pharetra vestibulum. Nam varius
					pulvinar magna, at faucibus dolor feugiat congue. Suspendisse et velit sit amet quam vehicula aliquet vel
					mattis ex. Aliquam non turpis orci. Proin convallis finibus semper. Donec cursus vulputate tellus eu congue.
					Duis molestie magna ipsum, sit amet ullamcorper ante tincidunt ac. Sed metus dui, ullamcorper ac porta at,
					tempor at velit. Sed ac vehicula ex, sed pharetra justo. Vestibulum varius, arcu malesuada scelerisque
					bibendum, velit metus cursus dui, mollis feugiat nisl diam vel leo. Fusce venenatis ipsum vitae dui dignissim
					tristique. In scelerisque ornare arcu, sit amet interdum urna molestie nec. Nunc venenatis blandit sapien,
					vitae vestibulum elit placerat molestie. Ut a egestas tortor, a luctus risus. Ut maximus sapien metus, et
					vulputate nisi auctor vitae. Nam pulvinar feugiat aliquam. Praesent hendrerit tincidunt turpis in porttitor.
					Sed sollicitudin metus a urna commodo sodales. Praesent posuere lorem congue arcu suscipit, non molestie elit
					malesuada. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam tristique consequat gravida.
					Aliquam in lacus semper, fermentum tellus vitae, gravida massa. Quisque tincidunt euismod augue vel tempus.
					Donec vitae nibh vulputate velit fringilla imperdiet aliquet vel sem. Donec ac ipsum tellus. Class aptent
					taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris mollis mauris a sem
					venenatis, vel consequat quam sollicitudin. Fusce fermentum rutrum egestas. Maecenas sit amet odio in ex
					imperdiet iaculis in lobortis tellus. Integer ultricies urna placerat condimentum cursus. Pellentesque quis
					volutpat sem. Maecenas quis feugiat tortor. Nulla facilisi.
				</div>
			</div>
		</InfoLayout>
	);
}

export default TestLayout;
