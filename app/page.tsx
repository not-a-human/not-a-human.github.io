import Image from "next/image";
import styles from "./page.module.css";
import { colors } from "@mui/material";
import imageBG from "../assets/boy.png";

export default function Home() {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${imageBG.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
          position: "absolute",
          zIndex: -1,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          color: colors.common.black,
          backgroundColor: colors.common.white,
          opacity: 0.4,
          width: "98%",
          height: "30vh",
          borderRadius: "10px",
          margin: "1%",
          padding: "1%",
        }}
      >
        <p>Click on the links above to navigate</p>
      </div>
    </div>
  );
}
