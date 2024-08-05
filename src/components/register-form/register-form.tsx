import { PostApiInteraction } from "@/controllers/post-api";
import { useState } from "react";

export default function RegisterForm() {

    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const api=new PostApiInteraction;
  
    async function registerSubmit(event:React.MouseEvent<HTMLElement>){
      event.preventDefault();
      try {
        if(!userEmail||!userPassword||!confirmPassword){
          throw "Por favor completa todos los datos";
        }
        if(userPassword!==confirmPassword){
          throw "Las contraseñas no coinciden";
        }
        await api.registerUser({email:userEmail,password:userPassword});
      } catch (error) {
        alert(error);
      }
    }
  
      return (
        <>
          <form id='register-form'>
              <label htmlFor='register-userEmail'>Correo Electrónico:</label>
              <input id='register-userEmail' type='email' required onChange={(e) => setEmail(e.target.value)}/>
              <label htmlFor='register-userPassword'>Contraseña:</label>
              <input id='register-userPassword' type='password' required onChange={(e) => setPassword(e.target.value)}/>
              <label htmlFor='confirm-userPassword'>Confirmar contraseña:</label>
              <input id='confirm-userPassword' type='password' required onChange={(e) => setConfirmPassword(e.target.value)}/>
              <button id="register-submitBtn" type='submit' onClick={registerSubmit}>Registrarme</button>  
          </form>
        </>
      );
  }