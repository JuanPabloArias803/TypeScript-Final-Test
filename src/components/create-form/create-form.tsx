import { PostApiInteraction } from "@/controllers/post-api";
import { calculateQuality } from "@/helpers/calculate-quality";
import { IPost } from "@/model/interfaces";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CreateForm(){
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [platform,setPlatform]=useState("");
    const [creator,setCreator]=useState("");
    const [postsArray, setPostsArray] = useState<IPost[]>([]);
    const api=new PostApiInteraction;
    const router=useRouter();

    async function createPost(event:React.MouseEvent<HTMLElement>){
        const date=new Date;
        event.preventDefault();
        try {
            if(!title||!body||platform===''||platform==='default'){
                throw "Por favor completa todos los datos";
            }

            const post:IPost={
                creationDate:`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`,
                creator,
                platform,
                body,
                title,
                corrections:0,
                approvalPercentage:0,
                status:'pending'
            }
            post.approvalPercentage=(await calculateQuality(post)).approvalPercent;
            post.corrections=(await calculateQuality(post)).corrections;

            postsArray.push(post);
            localStorage.setItem('Posts',JSON.stringify(postsArray));

            if(post.approvalPercentage>95){
                await api.createPost(post);
                post.status='Published';
            }
            router.push('/');

        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        const authUser = sessionStorage.getItem('UAuth');
        if (authUser) {
          setCreator(authUser);
        }
        const posts = localStorage.getItem('Posts');
        if(posts){
          setPostsArray(JSON.parse(posts));
        }
      }, []);


    return (
        <>
          <form className='create-form'>
              <label>Seleccionar plataforma:</label>
              <select required onChange={(e) => setPlatform(e.target.value)}>
                <option value="default" defaultChecked>Seleccionar</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="twitter">Twitter</option>
              </select>
              <label>Título:</label>
              <input type="text" required maxLength={25} onChange={(e) => setTitle(e.target.value)}/>
              <label>Contenido:</label>
              <textarea rows={10} required onChange={(e) => setBody(e.target.value)}/>
              <button type='submit' onClick={createPost}>Crear</button>
          </form>
        </>
      );
}