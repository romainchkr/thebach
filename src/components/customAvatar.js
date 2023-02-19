import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { alpha, styled } from '@mui/material/styles';

const CustomAvatar = styled(Avatar)(({ theme }) => ({

}));

export default function StyledAvatar({src, sx, style}) {
    return (
        <div className="avatarBorder">
            <CustomAvatar src={src} sx={sx} style={style}/>
        </div>
    )
}