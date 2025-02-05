import React, { useEffect, useState } from "react";
import logo from "../../assets/icons/logo_only.png";
import logoText from "../../assets/icons/logo-text.png";
import Swal from "sweetalert2";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    useEffect(()=>{
        const isAuthenticated = localStorage.getItem("DefenderauthToken");
        if(isAuthenticated){
            navigate("/admin/dashboard")
        }
    },[])

    const handleSubmit = async (e) => {
        try {
            setLoading(true)
            console.log('formdata : ,',formData)
            const result = await api.login(formData)
            console.log('result : ',result)
            if (result.error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: result.error.message || "Something went wrong!",
                });
            } else {
                localStorage.setItem("DefenderauthToken", "defendertoken123");
                navigate("/admin/dashboard")
                Swal.fire({
                    icon: "success",
                    title: "Logged IN",
                    text: "Admin Logged In successfully!",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Something went wrong!",
            });
        } finally {
            setLoading(false)
        }
    };

    return (
        <>

            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="flex flex-col absolute top-7 left-10 items-center ">
                    <img className="h-[2.5vw] pt-[0.5vw]" src={logo} alt="Logo" />
                    <img className="h-[3vw] w-auto" src={logoText} alt="Logo Text" />
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6"
                >
                    <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;
