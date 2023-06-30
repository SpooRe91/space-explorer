import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import styles from "./PoDModal.module.scss";
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../App/hooks';
import { podState } from '../../redux-slices/PODslice';
import { globalState, setIsLoading, setToShowPoD } from '../../redux-slices/globalSlice';

const style = {
    // eslint-disable-next-line @typescript-eslint/prefer-as-const
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '750px',
    boxShadow: 24,
    p: 4,
};

export default function PoDModal() {

    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    const globalData = useAppSelector(globalState);
    const podData = useAppSelector(podState);
    const dispatch = useAppDispatch();

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            e.stopPropagation();
            e.preventDefault();
            dispatch(setIsLoading(false));
            dispatch(setToShowPoD(false))
        }
    }

    const handleImageLoaded = (): void => {
        setImageLoaded(true);
        dispatch(setIsLoading(false));
    }

    return (
        <div className={styles['modal-main-container']}>
            <Modal

                open={globalData.showPoD}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                    <img src={podData.hdurl}
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                            handleModalClick(e)
                        }}
                        onLoad={() => handleImageLoaded()}
                        title={podData.title}
                        loading={'lazy'}
                        alt={"This is supposed to be the picture of the day, \n but NASA's can't provide it now."}
                    />
                    {
                        !imageLoaded
                            ?
                            <p className={styles["image-loading-text"]}>
                                Loading...
                            </p>
                            : null
                    }
                </>
            </Modal>
        </div>
    );
}

