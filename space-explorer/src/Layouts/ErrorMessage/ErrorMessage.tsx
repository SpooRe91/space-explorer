import Alert from '@mui/material/Alert';
import { useAppSelector } from '../../App/hooks';
import { globalState } from '../../redux-slices/globalSlice';
const ErrorMessage = () => {

    const globalData = useAppSelector(globalState);

    return (
        <div>
            <Alert severity="error">Sorry, there seems to be a {globalData.error}, please try again later!</Alert>
        </div>
    )
}

export default ErrorMessage