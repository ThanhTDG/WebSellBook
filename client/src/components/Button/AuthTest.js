import axios from "axios";
import React from "react";
const instance = axios.create({
    baseURL: `https://toi-mua-sach.herokuapp.com/api`,
    // withCredentials: true,
    // credentials: "include",
});
const getProfile = () => {
    instance
        .get("/auth/profile", { withCredentials: true })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.response.data.message));
}
const signIn = () => {
    instance
        .post("/auth/signin", {
            username: "khachhang@example.com",
            password: "1234abcd",
        })
        .then((res) => {
            console.log(res.data);

        })
        .catch((err) => console.log(err.response.data.message));
}
class AuthTest extends React.Component {

    render() {
        return <div>
            <button onClick={signIn}>Sign In</button>
            <button onClick={getProfile}>Get profile</button>

        </div>;
    }
}

export default AuthTest;