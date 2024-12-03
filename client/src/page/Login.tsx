import React from "react";

// hooks
import { useState, useEffect } from "react";
const Login: React.FC = function () {
    const [username, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [usernameWarning, setUsernameWarning] = useState<string>("")
    const [passwordWarning, setPasswordWarning] = useState<string>("")
    useEffect(() => {
        if (username == "") setUsernameWarning("")
        if (username.includes(" ")) setUsernameWarning("include invalid character")
        if (username.length > 10) setUsernameWarning("too long")
    }, [username])
    useEffect(() => {

    }, [password])

    return (
        <div className="h-full w-full flex justify-center">
            <div id="login-box" className="relative w-[80%] mt-[2rem] min-h-[18rem] max-w-[20rem] rounded-sm shadow-sm shadow-gray-400 flex flex-col" >
                <h1 className="h-[20%] font-bold flex items-center justify-center text-[1rem]">sign in</h1>
                <hr />
                <div id="username-box" className="flex flex-col px-[1rem] text-[0.75rem]">
                    <label htmlFor="" className="pl-[0.25rem] font-bold ">• username</label>
                    <input autoFocus type="text" className="h-[2rem] rounded-r-lg bg-[#FBFBFB] shadow-sm shadow-gray-300 px-[0.25rem] focus:outline-none focus:bg-[#FFFBF5] focus:border-l-[3px] border-[#003161] text-[0.75rem] transition-colors duration-400" placeholder="enter your username"
                        onChange={(e) => { setUserName(e.target.value) }}></input>
                    <span id="username-warning" className="text-red-500 h-[1rem] pl-[0.25rem]">{(usernameWarning !== "") ? `• ${usernameWarning}!` : ""}</span>
                </div>
                <div id="password-box" className="flex flex-col px-[1rem] text-[0.75rem] mt-[0.5rem]">
                    <label htmlFor="" className="pl-[0.25rem] font-bold ">• password</label>
                    <input type="text" className="h-[2rem] rounded-r-lg bg-[#FBFBFB] shadow-sm shadow-gray-300 px-[0.25rem] focus:outline-none focus:bg-[#FFFBF5] focus:border-l-[3px] border-[#003161] text-[0.75rem] transition-colors duration-400" placeholder="enter your password" ></input>
                    <span id="password-warning" className="text-red-500 h-[1.2rem] pl-[0.25rem]">{(passwordWarning !== "") ? `• ${passwordWarning}!` : ""}</span>
                </div>
                <hr />
                <div className="absolute w-full bottom-[1rem]">
                    <div className="w-full flex justify-center">
                        <button className="w-[40%] h-[2rem] shadow-sm shadow-gray-300 rounded-full hover:text-[#355F2E] bg-blue-200 hover:bg-green-200 transition-colors duration-300">go!</button>
                    </div>
                    <div className="w-full flex justify-center">
                        <span className="text-[0.5rem] pt-[0.2rem]">new to graphCenter?<a href="/register" className="font-bold text-blue-300 hover:underline hover:text-blue-800 hover:cursor-pointer">create</a></span>
                    </div>
                </div>
            </div>
        </div>)
}

export default Login