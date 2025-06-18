import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log("session called",session);
  
  return (
    <div>
      <h2>Home</h2>
      
    </div>
  );
}
