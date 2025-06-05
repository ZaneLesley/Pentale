import Icon from '@mdi/react';
import {mdiEmailPlus, mdiGithub} from '@mdi/js';

import styles from './Footer.module.css';

export default function Footer() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles["icon-div"]}>
                    <a href={"mailto:zanelesley@outlook.com"} target="_blank" rel="noopener noreferrer">
                        <Icon path={mdiEmailPlus} size={1.5}></Icon>
                    </a>
                    <a href={"https://github.com/ZaneLesley/Pentale"} target="_blank" rel="noopener noreferrer">
                        <Icon path={mdiGithub} size={1.5}></Icon>
                    </a>
                </div>
                <div>Website Created by <a href={"https://zanelesley.com/"} target="_blank" rel="noopener noreferrer">Zane
                    Lesley</a></div>
                <div className={styles.spacer}></div>
            </div>
        </>
    );
}