import { ICheckResponse, IPost } from "@/model/interfaces";

export class CheckApiInteraction{
    readonly domain:string='https://api.languagetool.org';

    async checkPostTitle(post:IPost){
        const options = {
            method: 'POST'
        };
        try {
            const response: Response = await fetch(`${this.domain}/v2/check?text=${post.title}&language=es`,options);
            if (!response.ok) {
              throw `Error en el servidor: (${response.status})`;
            }
            const responseData:ICheckResponse= await response.json();
            return responseData;
          } catch (error) {
            alert(error);
          }
    }

    async checkPostBody(post:IPost){
        const options = {
            method: 'POST'
        };
        try {
            const response: Response = await fetch(`${this.domain}/v2/check?text=${post.body}&language=es`,options);
            if (!response.ok) {
              throw `Error en el servidor: (${response.status})`;
            }
            const responseData:ICheckResponse= await response.json();
            return responseData;
          } catch (error) {
            alert(error);
          }
    }
}