import { IAuthResponse, IUser } from "@/model/interfaces";
import { useRouter } from "next/router";

export class PostApiInteraction{
    readonly domain:string='https://api-posts.codificando.xyz';
    router=useRouter();

    async registerUser(user:IUser){
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        };
        try {
            const response: Response = await fetch(`${this.domain}/users/register`,options);
            if (!response.ok) {
              throw `Error en el servidor: (${response.status})`;
            }
            alert("Usuario registrado exitosamente");
            this.router.push("/login");
          } catch (error) {
            alert(error);
          }
    }

    async authUser(user:IUser){
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        };
        try {
            const response: Response = await fetch(`${this.domain}/auth/login`,options);
            if (!response.ok) {
              throw `Error en el servidor: (${response.status})`;
            }
            const responseData:IAuthResponse= await response.json();
            if(responseData.message==="Login successful"){
                sessionStorage.setItem('UAuth',"true"); //Save auth in sessionStorage
                this.router.push("/");
            }else{
                throw 'Usuario o contraseña incorrectos';
            }
            
          } catch (error) {
            alert(error);
          }
    }
}