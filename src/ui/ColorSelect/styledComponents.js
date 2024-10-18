import { styled } from '@mui/material/styles';
import { Select, MenuItem } from '@mui/material';

export const StyledSelect = styled(Select)(({ theme }) => ({
    width: '100%',
    height: '100%',
    backgroundColor: 'none',
    color: theme.palette.text.primary, 
    borderRadius: theme.shape.borderRadius,
    padding: 0, 
    '& .MuiSelect-select': {
        paddingTop: 0,
        paddingBottom: 0,
    },
    '& .MuiSelect-icon': {
        color: theme.palette.text.primary,
    },
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    '&:hover': {
        background: '#1f1f5360', 
    },
    '&.Mui-selected': {
        background: theme.palette.primary.light, 
        color: theme.palette.text.primary,
    },
}));
