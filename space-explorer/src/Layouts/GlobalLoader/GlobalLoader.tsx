import BarLoader from "react-spinners/BarLoader";
import styles from './GlobalLoader.module.scss';

const GlobalLoader = () => {
    return (
        <div className={styles['global-loader-container']}>
            <BarLoader
                width={"100%"}
                height={5}
                color='#1e4d97' />
        </div>
    )
}

export default GlobalLoader