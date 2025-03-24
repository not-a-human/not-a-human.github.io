import styles from "./page.module.css";
import { CursorShadow } from "./ui/cursor-shadow/cursorShadow";
import { Textbox } from "./ui/home/textbox";
import { Menu } from "./ui/menu/menu";
import { About } from "./ui/about/about";
import { Project } from "./ui/project/project";
import { Contact } from "./ui/contact/contact";
import { Footer } from "./ui/footer/footer";
import { MobileSocials } from "./ui/menu/mobileSocials";

export default function Home() {
  return (
    <div>
      <CursorShadow />
      <div className={`${styles.centerFlex} ${styles.positionRelative}`}>
        <Textbox />
      </div>
      <Menu />
      <About />
      <Project />
      <Contact />
      <Footer />
      <MobileSocials />
    </div>
  );
}
