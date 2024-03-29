import BarLoader from "react-spinners/BarLoader";
import styles from './GlobalLoader.module.scss';

const GlobalLoader:React.FC = () => {
    return (
        <div className={styles['global-loader-container']}>
            <BarLoader
                width={"100%"}
                height={5}
                color='#c5d3fe'
            />
        </div>
    )
}

export default GlobalLoader