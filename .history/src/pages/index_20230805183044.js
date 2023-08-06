import Quiz from "@/Components/Quiz";
import { Inter, Poppins, Roboto } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: ["100", "300", "400"], subsets: ["latin"] });
const poppins = Poppins({
  weight: ["100", "200", "400"],
  subsets: ["devanagari"],
});

export default function Home() {
  const [user, setUser] = useState("");
  const router = useRouter();
  useEffect(() => {
    const loginName = sessionStorage.getItem("username");
    if (loginName) {
      setUser(loginName);
    } else {
      router.replace("/login");
    }
  }, [setAnswer]);
  return (
    <>
      <Head>
        <title>TT Security Check</title>
        <meta name="description" content="Honeywell Automation India Limited" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={poppins.className}
        style={{
          height: "100vh",
        }}
      >
        <Navbar />
        <Quiz />
      </main>
    </>
  );
}
