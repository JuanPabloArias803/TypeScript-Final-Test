import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  
  const router=useRouter();

  useEffect(() => {
    const auth = sessionStorage.getItem('UAuth');
    if (!auth) {
      router.push("/login");
    }
  }, []);
  
  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={()=>{
        sessionStorage.removeItem('UAuth');
        router.push("/login");
      }}>Logout</button>
    </>
  );
}
