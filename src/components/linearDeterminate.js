import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const LinearDeterminate = ({duration}) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        console.log(duration)
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                } else if(oldProgress === 0) {
                    oldProgress = 500/(duration/100);
                }
                return Math.min(oldProgress+500/(duration/100),100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={progress} />
        </Box>
    );
}

export default LinearDeterminate