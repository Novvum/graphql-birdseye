import * as React from "react";
import styles from "./Loader.css";
import { Colors } from "graphql-birdseye-core/src/theme";

export interface Props {
  colors: Colors;
}
const Loader = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={`${styles.canvas}`}>
        <div className={`${styles.spinner7}`} />
      </div>
    </div>
  );
};

export default Loader;
