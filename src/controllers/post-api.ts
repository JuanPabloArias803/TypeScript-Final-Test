import { IAuthResponse, IPost, IUser } from "@/model/interfaces";
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
                sessionStorage.setItem('UAuth',user.email); //Save auth in sessionStorage
                this.router.push("/");
            }else{
                throw 'Usuario o contraseña incorrectos';
            }
            
          } catch (error) {
            alert(error);
          }
    }

    async createPost(post:IPost){
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': post.creator
        },
        body:JSON.stringify({
          "title": post.title,
          "body": post.title,
          "creationDate": post.creationDate,
          "creator": post.creator,
          "estimatedPublicationDate": post.creationDate,
          "status": post.status,
          "approvalPercentage": post.approvalPercentage,
          "corrections": post.corrections,
          "platform": post.approvalPercentage,
          "postUrl": "http://example.com/post",
          "multimediaUrl": "http://example.com/media"
        }),
    };
    try {
        const response: Response = await fetch(`${this.domain}/posts`,options);
        if (!response.ok) {
          throw `Error en el servidor, no se pudo publicar el post: (${response.status})`;
        }
      } catch (error) {
        alert(error);
      }
    }
}