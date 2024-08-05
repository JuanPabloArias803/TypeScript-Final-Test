import { useRouter } from "next/router";

export default function Navbar() {

    const router=useRouter();

    async function logout(){
        sessionStorage.removeItem("UAuth");
        router.push("/login");
    }

    return (
        <>
          <nav>
            <span>
                <h3>Instabook</h3>
            </span>
            <ul>
                <li onClick={()=>router.push("/")}>Home</li>
                <li onClick={()=>router.push("/create-post")}>Crear</li>
                <li onClick={logout}>Cerrar Sesión</li>
            </ul>
          </nav>
        </>
      );
}