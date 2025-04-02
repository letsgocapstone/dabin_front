"use client"

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [blankId, setBlankId] = useState(false);
  const [blankPw, setBlankPw] = useState(false);

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.length <= 0) setBlankId(true);
    if (password.length <= 0) setBlankId(true);
    if (!blankId && !blankPw) {
      await signIn("credentials", {
        username: email,
        password: password,
        redirect: true,
        callbackUrl: "/",
      }).then(() => {
        alert("로그인이 완료되었습니다.");
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/image/pexels-mo-eid-9002742.jpg')" }}>
      <div className="relative w-[450px] h-[450px] backdrop-blur-lg border border-white rounded-lg text-center p-6">
        <h2 className="text-3xl text-white mb-6">Login</h2>
        
        {/* 아이디 입력 */}
        <div className="relative mb-4">
          <input
            type="email"
            placeholder="Username"
            className="w-[70%] h-[50px] px-4 pr-12 outline-none border border-white rounded-full bg-transparent text-white text-base placeholder-white"
          />
          <i className="fas fa-user text-white absolute right-8 top-1/2 transform -translate-y-1/2"></i>
        </div>

        {/* 비밀번호 입력 */}
        <div className="relative mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-[70%] h-[50px] px-4 pr-12 outline-none border border-white rounded-full bg-transparent text-white text-base placeholder-white"
          />
          <i className="fas fa-lock text-white absolute right-8 top-1/2 transform -translate-y-1/2"></i>
        </div>

        {/* 체크박스 & 비밀번호 찾기 */}
        <div className="flex items-center justify-center gap-4 text-white mb-4">
          <input type="checkbox" className="mr-2" />
          <span>Remember me</span>
          <a href="#" className="underline">Forgot Password?</a>
        </div>

        {/* 로그인 버튼 */}
        <div className="mb-4">
          <button className="w-[70%] h-[50px] border border-white bg-white text-black font-bold rounded-full cursor-pointer text-base">
            Login
          </button>
        </div>

        {/* 회원가입 링크 */}
        <div className="text-white">
          <span>Don't have an account?</span>
          <a href="#" className="underline ml-2">Register</a>
        </div>
      </div>
    </div>
  );
}