import { IUser } from "@/model/interfaces";

export class PostApiInteraction{
    readonly domain:string='https://api-posts.codificando.xyz';

    async registerUser(user:IUser){
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        };

        try {
            const response: Response = await fetch(
              `${this.domain}/users/register`,
              options
            );
            if (!response.ok) {
              throw `Error en el servidor: (${response.status})`;
            }
            alert("Usuario registrado exitosamente");
            //this.router.push("/login");
          } catch (error) {
            alert(error);
          }
    }
}