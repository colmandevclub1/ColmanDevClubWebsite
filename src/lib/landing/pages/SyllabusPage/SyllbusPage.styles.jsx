import { Card, styled } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    margin: "0 auto",
    transition: 'all 0.3s',
      '&:hover': {
          boxShadow: '0px 0px 3px 0px #F6C927',
          transform: 'scale(1.03)',
      },
  }));