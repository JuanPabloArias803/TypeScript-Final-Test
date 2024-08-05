import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { IPost } from "@/model/interfaces";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CreatePost() {

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [platform,setPlatform]=useState("");  
  const router=useRouter();
  const searchParams = useSearchParams();
  const post:IPost = JSON.parse(searchParams.get("post")!);

  function editPost(event:React.MouseEvent<HTMLElement>){
    event.preventDefault();
  }

  useEffect(() => {
      const auth = sessionStorage.getItem('UAuth');
      if (!auth) {
        router.push("/login");
      }
    }, []);

  return (
    <div id='create-container'>
        <Navbar/>
        <h2>Editar Post</h2>
        <form className='create-form'>
              <label>Seleccionar plataforma:</label>
              <select required onChange={(e) => setPlatform(e.target.value)}>
                <option value="default" defaultChecked>Seleccionar</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="twitter">Twitter</option>
              </select>
              <label>Título:</label>
              <input type="text" value={post.title} required maxLength={25} onChange={(e) => setTitle(e.target.value)}/>
              <label>Contenido:</label>
              <textarea rows={10} value={post.body} required onChange={(e) => setBody(e.target.value)}/>
              <button type='submit' onClick={editPost}>Editar</button>
          </form>
        <Footer/>
    </div>
  );
}