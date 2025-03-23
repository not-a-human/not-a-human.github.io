import Image from "next/image";
import styles from "./page.module.css";
import imageBG from "../assets/boy.png";
import { Textbox } from "./ui/textbox";
import { Menu } from "./ui/menu";
import { About } from "./ui/about";

export default function Home() {
  return (
    <div>
      <div className={`${styles.centerFlex} ${styles.positionRelative}`}>
        <Textbox />
      </div>
      <Menu />
      <About />
    </div>
    
  );
}
