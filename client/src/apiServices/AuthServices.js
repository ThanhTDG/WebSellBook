import axios from 'axios';
import * as request from '../utils/request';

const url = "https://api.toimuasach.click";

const instance = axios.create({
    baseURL: `${url}/api/v1`,
    withCredentials: true,
});

export const login = async (u, p) => {
    try {
        const res = await instance.post("/auth/signin", {
            username: u,
            password: p,
        });
        console.log("login", res.data);
        return res.data
    } catch (err) {
        console.log(err)
        return false
    }
};

export const profile = async () => {
    try {
        const res = await instance.get("/auth/profile");
        console.log("profile", res.data);
        return res.data
    } catch (err) {
        console.log(err)
    }
};

export const logout = async () => {
    try {
        const res = await instance.post("/auth/signout")
        console.log("logout", res.data)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const signUp = async (userRegisterInfo) => {
    try {
        const res = await instance.post("/auth/signup", {
            firstName: userRegisterInfo.firstName,
            lastName: userRegisterInfo.lastName,
            email: userRegisterInfo.email,
            phone: userRegisterInfo.phone,
            password: userRegisterInfo.password
        })
        console.log("signUp", res.data)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const changePassword = async (currentPassword, newPassword) => {
    try {
        const res = await instance.put("/auth/changepassWord", {
            currentPassword: currentPassword,
            newPassword: newPassword
        })
        console.log("changePassword", res.data)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const changeProfile = async (userInfo) => {
    try {
        console.log(userInfo)
        const res = await instance.put("/auth/profile", {
            ...userInfo
        })
        console.log("update Profile", res.data)
        return res.data
    } catch (err) {
        console.log(err)
    }
}
export const changeAvatar = async (avatar) => {
    try {
        console.log('avatar',avatar)
        const res = await instance.put("/auth/uploadavatar", avatar)
        console.log("update avatar", res.data)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const verityAccount = async (password) => {
    try {
        const res = await instance.post("/auth/verifyaccount", ({
            password: password
        }))
        console.log("verify Account", res.data)
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}