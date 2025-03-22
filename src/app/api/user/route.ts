import prisma from "@/app/lib/prisma";

const bcrypt = require("bcrypt");

//회원가입 시 클라이언트에서 보내는 데이터의 타입 정의
interface RequestBody {
  name: string;
  email: string;
  password: string;
}

//POST 요청 처리
export async function POST(request: Request) {
  const body: RequestBody = await request.json(); //body 변수에 클라이언트가 보낸 JSON 데이터를 가져옴

  //비밀번호 암호화 후, 사용자 정보를 DB에 저장
  const user = await prisma.user.create({ //Prisma User table에 새로운 클라이언트 추가
    data: {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10), //비밀번호 암호화 (10: 해싱 강도)
    },
  });

  const {password, ...result} = user; //user 객체에서 password 값 제외하고 새로운 객체 result에 분리
  return new Response(JSON.stringify(result)); //클라이언트에게 데이터 반환, 나중에 회원가입 완료됐다 출력으로 바꿔도 될듯...
  //const response = new Response("회원가입 완료");
  //console.log(response);
}