import * as React from 'react';
import styles from "./Loader.css";
import { Colors } from './defaultTheme';

export interface Props {
    colors: Colors;
}
const Loader = (props: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.background} />
            <div className={`${styles.canvas}`}>
                <div className={`${styles.spinner1} ${styles.spinnerMax}`}>
                    <div className={`${styles.spinner1} ${styles.spinnerMid}`}>
                        <div className={`${styles.spinner1} ${styles.spinnerMin}`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
