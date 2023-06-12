import Alert from '@mui/material/Alert';
import { useAppSelector } from '../../App/hooks';
import { globalState } from '../../redux-slices/globalSlice';

const ErrorMessage = ({ error }: { error: string }) => {

    const globalData = useAppSelector(globalState);
    globalData.error
    return (
        <div>
            <Alert style={{ fontSize: "1.5rem" }}
                severity="error">
                {/* IF THERE IS AN ERORR PASSED - DISPLAY THAT, OTHERWISE DISPLAY THE GLOBAL ERROR */}
                Sorry, there seems to be a {error ? error : globalData.error}, please try again later!
            </Alert>
        </div>
    )
}

export default ErrorMessage