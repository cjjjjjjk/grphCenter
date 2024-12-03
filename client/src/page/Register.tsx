import React from "react";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";


const Register: React.FC = function () {
    const navigate = useNavigate()
    const [username, setUserName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const [usernameWarning, setUsernameWarning] = useState<string>("")
    const [passwordWarning, setPasswordWarning] = useState<string>("")
    const [confirmpasswordWarning, setConfirmPasswordWarning] = useState<string>("")
    useEffect(() => {
        if (username == "") setUsernameWarning("")
        if (username.includes(" ")) setUsernameWarning("include invalid character")
        if (username.length > 10) setUsernameWarning("too long")
    }, [username])
    useEffect(() => {

    }, [password])
    // Validattion =========================================================================
    useEffect(() => {
        if (password === confirmPassword || confirmPassword === "") setConfirmPasswordWarning("");
        else setConfirmPasswordWarning("wrong ! check again ")
    }, [confirmPassword])
    // =====================================================================================
    // call api : create new user ==========================================================
    const HandleRegister = async function () {
        try {
            const response = await axios.post(`${process.env.REACT_APP_URL_SERVER}api/users/create`, { username, password, email });

            navigate('/login')
            console.log(response)
        } catch (err) {
            console.log("Register: ", err)
        }
    }
    //======================================================================================

    return (
        <div className="h-full w-full flex justify-center">
            <div id="login-box" className="relative w-[80%] mt-[2rem] min-h-[28rem] max-w-[20rem] rounded-sm shadow-sm shadow-gray-400 flex flex-col" >
                <h1 className="h-[20%] font-bold flex items-center pl-[1.25rem] text-[1rem]">welcome to graphCenter !</h1>
                <hr />
                <div id="username-box" className="flex flex-col px-[1rem] text-[0.75rem]">
                    <label htmlFor="" className="pl-[0.25rem] font-bold ">• username</label>
                    <input autoFocus type="text" className="h-[2rem] rounded-r-lg bg-[#FBFBFB] shadow-sm shadow-gray-300 px-[0.25rem] focus:outline-none focus:bg-[#FFFBF5] focus:border-l-[3px] border-[#003161] text-[0.75rem] transition-colors duration-400" placeholder="enter your username"
                        onChange={(e) => { setUserName(e.target.value) }}></input>
                    <span id="username-warning" className="text-red-500 text-[0.5rem] h-[1rem] pl-[0.25rem]">{(usernameWarning !== "") ? `• ${usernameWarning}!` : ""}</span>
                </div>
                <div id="email-box" className="flex flex-col px-[1rem] text-[0.75rem]">
                    <label htmlFor="" className="pl-[0.25rem] font-bold ">• email</label>
                    <input autoFocus type="text" className="h-[2rem] rounded-r-lg bg-[#FBFBFB] shadow-sm shadow-gray-300 px-[0.25rem] focus:outline-none focus:bg-[#FFFBF5] focus:border-l-[3px] border-[#003161] text-[0.75rem] transition-colors duration-400" placeholder="enter your username"
                        onChange={(e) => { setEmail(e.target.value) }}></input>
                    <span id="username-warning" className="text-red-500 text-[0.5rem] h-[1rem] pl-[0.25rem]">{(usernameWarning !== "") ? `• ${usernameWarning}!` : ""}</span>
                </div>
                <div id="password-box" className="flex flex-col px-[1rem] text-[0.75rem] mt-[0.5rem]">
                    <label htmlFor="" className="pl-[0.25rem] font-bold ">• password</label>
                    <input type="password" className="h-[2rem] rounded-r-lg bg-[#FBFBFB] shadow-sm shadow-gray-300 px-[0.25rem] focus:outline-none focus:bg-[#FFFBF5] focus:border-l-[3px] border-[#003161] text-[0.75rem] transition-colors duration-400" placeholder="enter your password"
                        onChange={(e) => { setPassword(e.target.value) }}></input>
                    <span id="password-warning" className="text-red-500 text-[0.5rem] h-[1rem] pl-[0.25rem]">{(passwordWarning !== "") ? `• ${passwordWarning}!` : ""}</span>
                </div>
                <div id="password-box" className="flex flex-col px-[1rem] text-[0.75rem] mt-[0.5rem]">
                    <label htmlFor="" className="pl-[0.25rem] font-bold ">• confirm password</label>
                    <input type="password" className="h-[2rem] rounded-r-lg bg-[#FBFBFB] shadow-sm shadow-gray-300 px-[0.25rem] focus:outline-none focus:bg-[#FFFBF5] focus:border-l-[3px] border-[#003161] text-[0.75rem] transition-colors duration-400" placeholder="confirm your password"
                        onChange={(e) => { setConfirmPassword(e.target.value) }}></input>
                    <span id="password-warning" className="text-red-500 text-[0.5rem] h-[1rem] pl-[0.25rem]">{(confirmpasswordWarning !== "") ? `• ${confirmpasswordWarning}!` : ""}</span>
                </div>
                <hr />
                <div className="absolute w-full bottom-[1rem]">
                    <div className="w-full flex justify-center">
                        <button className="w-[40%] h-[2rem] shadow-sm shadow-gray-300 rounded-full hover:text-[#355F2E] bg-blue-200 hover:bg-green-200 transition-colors duration-300"
                            onClick={HandleRegister} >create</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Register