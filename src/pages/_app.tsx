import "@/styles/globals.css";
import "@/styles/index.css";
import "@/styles/register.css";
import "@/components/register-form/register-form.css";
import "@/components/login-form/login-form.css";
import "@/styles/login.css";
import "@/components/navbar/navbar.css";
import "@/components/footer/footer.css";
import "@/styles/create-post.css"
import "@/components/create-form/create-form.css";
import "@/components/post-card/post-card.css";
import dynamic from "next/dynamic";
import { AppProps } from "next/app";

const TopProgressBar = dynamic(
  () => {
    return import("@/components/loader");
  },
  { ssr: false },
);

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <TopProgressBar/>
    <Component {...pageProps} />
  </>
}
