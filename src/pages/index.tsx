import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import PostCard from "@/components/post-card/post-card";
import { IPost } from "@/model/interfaces";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  
  const router=useRouter();
  const [postsArray, setPostsArray] = useState<IPost[]>([]);

  useEffect(() => {
    const auth = sessionStorage.getItem('UAuth');
    if (!auth) {
      router.push("/login");
    }
    const posts = localStorage.getItem('Posts');
    if(posts){
      setPostsArray(JSON.parse(posts));
    }
  }, []);
  
  return (
    <div id="index-container">
      <Navbar/>
      <span>
        <h1>Posts recientes</h1>
        <div id="cards-container">
          {postsArray.map((post,index)=><PostCard post={post} key={index}/>)}
        </div>
      </span>
      
      <Footer/>
    </div>
  );
}
