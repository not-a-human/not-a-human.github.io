import Image from "next/image";
import styles from "./page.module.css";
import imageBG from "../assets/boy.png";
import { Textbox } from "./ui/textbox";
import { Menu } from "./ui/menu";
import { About } from "./ui/about";
import { Project } from "./ui/project";
import { Contact } from "./ui/contact";
import { Footer } from "./ui/footer";

export default function Home() {
  return (
    <div>
      <div className={`${styles.centerFlex} ${styles.positionRelative}`}>
        <Textbox />
      </div>
      <Menu />
      <About />
      <Project />
      <Contact />
      <Footer />
    </div>
  );
}
