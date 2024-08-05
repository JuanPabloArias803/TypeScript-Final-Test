import LoginForm from "@/components/login-form/login-form";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {

    const router=useRouter();

    useEffect(() => {
        const auth = sessionStorage.getItem('UAuth');
        if (auth) {
          router.push("/");
        }
      }, []);

  return (
    <div id='login-container'>
      <h2>Iniciar Sesión</h2>
      <LoginForm/>
      <span>
        <p>No tienes cuenta?</p>
        <button id='navigate-registerBtn' onClick={()=>router.push("/register")}>Registrate</button>
      </span>
    </div>
  );
}