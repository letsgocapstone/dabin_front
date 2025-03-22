import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [ //Authorization provider
    CredentialsProvider({ 
      name: "Credentials",

      //login form
      credentials: {
        username: {label: "e-mail", type: "text", placeholder: "email"},
        password: {label: "password", type: "password"}
      },

        //로그인 시 실행되는 함수, 클라이언트가 입력한 이메일과 비밀번호를 검증
      async authorize(credentials, req) {
        if (!credentials || !credentials.username || !credentials.password) {
          throw new Error("이메일과 비밀번호를 입력해주세요.");
        }

        const res = await fetch('${process.env.NEXTAUTH_URL}/api/login', 
        {
          method:"POST", //서버에 데이터 전송(로그인 요청)
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password
          })
        });
        const user = await res.json(); //백엔드에서 응답받은 데이터를 JSON으로 변환
        console.log(user); //디버깅용

        if (user) return user;
        else return null;
      }
    })
  ],

  //accessToken 관리
  callbacks: {
    async jwt({token, user}) {
      return {...token, ...user}; //기존 토큰에 유저 정보 합쳐서 반환
    },

    //session(): 클라이언트가 세션 데이터 가져올 때 실행
    async session({session, token}) {
      session.user = token as any; //JWT 토큰 정보를 session 객체에 저장
      return session;
    }
  },
  //custom page 사용..
  pages: {signIn: "/signin"}
});

export {handler as GET, handler as POST};

        /*async authorize(credentials, req) {
          if (!credentials || !credentials.username || !credentials.password) {
            throw new Error("이메일과 비밀번호를 입력해주세요.");
          }
  
          const user = { id: "1", name: "JUA", email: "JUAREO@NAVER.COM", password: "1234" };
  
          if (credentials.username !== user.email || credentials.password !== user.password) {
            throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
          }
          return user;
        }*/