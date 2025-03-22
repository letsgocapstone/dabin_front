//로그인 api logic

import prisma from "@/app/lib/prisma";

const bcrypt = require("bcrypt");

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json(); //body에 client가 입력한 정보 저장

  //사용자가 입력한 email과 일치하는 사용자 찾기..
  const user = await prisma.user.findFirst({
    where: {email: body.username} 
  });

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const {password, ...userWithoutPass} = user;
    return new Response(JSON.stringify(userWithoutPass));
  }
  else return new Response(JSON.stringify(null));
}