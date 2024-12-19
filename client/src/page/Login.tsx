import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../contexts/UserInfor_context";

// hooks
import { useState, useEffect } from "react";

// token decode ==================
function decodeToken(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
}
// ===============================

const Login: React.FC = function () {
    const navigate = useNavigate()

    const [username, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [usernameWarning, setUsernameWarning] = useState<string>("")
    const [passwordWarning, setPasswordWarning] = useState<string>("")
    const [loginWarning, setloginWarning] = useState<string>("")
    useEffect(() => {
        if (username.length <= 10) setUsernameWarning("")
        if (username.includes(" ")) setUsernameWarning("include invalid character")
        if (username.length > 10) setUsernameWarning("too long")
        setloginWarning("")
    }, [username])
    useEffect(() => {

    }, [password])

    // Handle Login ===============================================
    const { SetUserName } = useUserContext()
    const HandleLogin = async function () {
        if (!usernameWarning && !passwordWarning)
            try {
                const Login_res = await axios.post(`${process.env.REACT_APP_URL_SERVER}api/users/login`, { username, password })
                if (Login_res.data.success) {
                    const tokenDecode_data = decodeToken(Login_res.data.token)

                    sessionStorage.setItem('token', Login_res.data.token);
                    sessionStorage.setItem('username', tokenDecode_data.username)
                    SetUserName(tokenDecode_data.username)
                    navigate('/')
                }
                setloginWarning(Login_res.data.message)
                return;
            } catch (err) {
                console.log(err)
            }
        else return;
    }
    const HandlEnterLogin = function (e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') HandleLogin();
        return;
    }
    // =============================================================

    return (
        <div className="h-full w-full flex justify-center">
            <div id="login-box" className="relative w-[80%] mt-[2rem] min-h-[20rem] max-w-[19rem] rounded-sm shadow-sm shadow-gray-400 flex flex-col" >
                <h1 className="h-[20%] font-bold flex items-center justify-center text-[1rem]">sign in</h1>
                <hr />
                <div id="username-box" className="flex flex-col px-[1rem] text-[0.75rem]">
                    <span id="username-warning" className="text-red-500 h-[1rem] pl-[0.25rem] whitespace-nowrap">{(loginWarning !== "") ? `• ${loginWarning}!` : ""}</span>
                    <label htmlFor="" className="pl-[0.25rem] font-bold ">• username</label>
                    <input autoFocus type="text" className="h-[2rem] rounded-r-lg bg-[#FBFBFB] shadow-sm shadow-gray-300 px-[0.25rem] focus:outline-none focus:bg-[#FFFBF5] focus:border-l-[3px] border-[#003161] text-[0.75rem] transition-colors duration-400" placeholder="enter your username"
                        onChange={(e) => { setUserName(e.target.value) }}></input>
                    <span id="username-warning" className="text-red-500 h-[1rem] pl-[0.25rem]">{(usernameWarning !== "") ? `• ${usernameWarning}!` : ""}</span>
                </div>
                <div id="password-box" className="flex flex-col px-[1rem] text-[0.75rem] mt-[0.5rem]">
                    <label htmlFor="" className="pl-[0.25rem] font-bold ">• password</label>
                    <input type="password" className="h-[2rem] rounded-r-lg bg-[#FBFBFB] shadow-sm shadow-gray-300 px-[0.25rem] focus:outline-none focus:bg-[#FFFBF5] focus:border-l-[3px] border-[#003161] text-[0.75rem] transition-colors duration-400" placeholder="enter your password"
                        onChange={(e) => { setPassword(e.target.value) }}
                        onKeyDown={HandlEnterLogin}></input>
                    <span id="password-warning" className="text-red-500 h-[1.2rem] pl-[0.25rem]">{(passwordWarning !== "") ? `• ${passwordWarning}!` : ""}</span>
                </div>
                <hr />
                <div className="absolute w-full bottom-[1rem]">
                    <div className="w-full flex justify-center">
                        <button className="w-[40%] h-[2rem] shadow-sm shadow-gray-300 rounded-full hover:text-[#355F2E] bg-blue-200 hover:bg-green-200 transition-colors duration-300"
                            onClick={() => { HandleLogin() }}>go!</button>
                    </div>
                    <div className="w-full flex justify-center">
                        <span className="text-[0.5rem] pt-[0.2rem]">new to graphCenter?<a href="/register" className="font-bold text-blue-300 hover:underline hover:text-blue-800 hover:cursor-pointer">create</a></span>
                    </div>
                </div>
            </div>
        </div>)
}

export default Login