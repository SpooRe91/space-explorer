import { RingLoader } from 'react-spinners';
import styles from './GlobalLoader.module.scss';

const GlobalLoader = () => {
    return (
        <div className={styles['global-loader-container']}>
            <div className={styles['global-loader-single-container-loading']}>
                <p className={styles['global-loader-text']}>
                    Loading...
                </p>
                <RingLoader className={styles['global-loader-spinner']}
                    size={100}
                    color='#36d7b7' />
            </div>
        </div>
    )
}

export default GlobalLoader