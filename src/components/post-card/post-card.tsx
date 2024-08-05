import { IPost } from "@/model/interfaces";

interface PostCardProps {
    post: IPost;
  }

export default function PostCard({post}:PostCardProps) {

    return (
        <div className="post-card">
            <h3>{post.title}</h3>
            <p>By {post.creator}</p>
        </div>
      );
}