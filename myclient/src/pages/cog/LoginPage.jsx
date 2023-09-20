import React, {useState} from "react";
import { bg_login, ic_car_challenge1 } from "../../assets";
import { Link, useNavigate  } from "react-router-dom";
import axios from "axios";
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleLogin = () => {
    const data = { username, password };

    // Mengirim data ke server Golang
    axios.post('/api/v1/users/login', data)
        .then(response => {
          // Tangani respons dari server di sini
          history('/owner/dashboard');
        })
        .catch(error => {
          // Tangani kesalahan jika permintaan gagal
          console.error(error);
        });
  };
  return (
    <div className="h-screen w-full">
      <img src={bg_login} alt="" className="filter blur-lg" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black bg-opacity-[0.6] p-5 flex flex-col rounded-xl w-[500px]">
            <div className="absolute mt-[-4.9%] ml-[-50px]"><img src={ic_car_challenge1} alt="" className="w-[80px]"/></div>
          <span className="text-white font-[900] text-[1.5em] text-center">LOGIN</span>
          <div class="mb-6 w-full">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john.doe@company.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div class="mb-6">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className={"flex justify-center"}> <p className={"text-red-600"}>{error}</p></div>}
          <Link ><div className="flex justify-center bg-blue-500 rounded p-3 text-white font-bold font[900]" onClick={handleLogin}><a>LOGIN</a></div></Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
