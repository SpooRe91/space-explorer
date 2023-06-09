import Alert from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../App/hooks';
import { globalState, setError } from '../../redux-slices/globalSlice';
import styles from "./ErrorMessage.module.scss";

const ErrorMessage = ({ error }: { error: string }) => {

    const globalData = useAppSelector(globalState);
    const dispatch = useAppDispatch();
    globalData.error
    return (
        <div className={styles['error-modal']}>
            <Alert style={{ fontSize: "1.5rem" }}
                severity="error">
                {/* IF THERE IS AN ERORR PASSED - DISPLAY THAT, OTHERWISE DISPLAY THE GLOBAL ERROR */}
                Error: {
                    globalData.error === "Network Error"
                        ? 'Sorry, there is a network issue, please try again later!'
                        : error
                            ? error
                            : globalData.error}
            </Alert>
            <button onClick={() => dispatch(setError(''))}>OK</button>
        </div>
    )
}

export default ErrorMessage