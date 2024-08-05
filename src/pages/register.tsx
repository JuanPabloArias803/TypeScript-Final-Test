import RegisterForm from "@/components/register-form/register-form";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function register() {

    const router=useRouter();

    useEffect(() => {
        const auth = sessionStorage.getItem('UAuth');
        if (auth) {
          router.push("/");
        }
      }, []);

  return (
    <div id='register-container'>
      <h2>Regístrate</h2>
      <RegisterForm/>
    </div>
  );
}