import { IPost } from "@/model/interfaces";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface PostCardProps {
    post: IPost;
  }

export default function PostCard({post}:PostCardProps) {

    const [postsArray, setPostsArray] = useState<IPost[]>([]);
    const router=useRouter();

    function deletePost(){
        for (let i = 0; i < postsArray.length; i++) {
            if(postsArray[i].body===post.body&&postsArray[i].title===post.title&&postsArray[i].creationDate===post.creationDate&&postsArray[i].creator===post.creator&&postsArray[i].platform===post.platform){
                postsArray.splice(i,1);
                localStorage.setItem('Posts',JSON.stringify(postsArray));
                    router.reload();
            }
            
        }
    }

    function editPost(){
        router.push({
            pathname: '/edit-post',
            query: { post: JSON.stringify(post) },
        });
    }

    useEffect(() => {
        const posts = localStorage.getItem('Posts');
        if(posts){
          setPostsArray(JSON.parse(posts));
        }
      }, []);

    return (
        <div className="post-card">
            <h3>{post.title}</h3>
            <p>By {post.creator}</p>
            <p>Publicado en: {post.platform}</p>
            <p className={post.approvalPercentage>95?'available':'unavailable'}>Calidad del post:{post.approvalPercentage}%</p>

            <span>
                <button onClick={deletePost}>Eliminar</button>
                <button onClick={editPost}>Editar</button>
            </span>
        </div>
      );
}