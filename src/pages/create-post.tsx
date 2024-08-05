import CreateForm from "@/components/create-form/create-form";
import Navbar from "@/components/navbar/navbar";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CreatePost() {

    const router=useRouter();

    useEffect(() => {
        const auth = sessionStorage.getItem('UAuth');
        if (!auth) {
          router.push("/login");
        }
      }, []);

  return (
    <div id='create-container'>
        <Navbar/>
      <h2>Crear Nuevo Post</h2>
      <CreateForm/>
    </div>
  );
}