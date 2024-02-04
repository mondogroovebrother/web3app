import type { NextPage } from "next";
import styles from "../styles/Home.module.css";


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
        <div className={styles.heroPage}>
          <div className={styles.heroSection}>
            <h1>Start Collecting Now!</h1>
            <p>Buy and open packs to collect laughingHeads. Collect common, rare, and ultra rare cards.</p>
            <button 
              className={styles.heroButton}
              onClick={() => window.location.href = "/story"}
            >Storytime</button>
          </div>
          <div>
          </div>
        </div>
    </div> 

  );
};

export default Home;
