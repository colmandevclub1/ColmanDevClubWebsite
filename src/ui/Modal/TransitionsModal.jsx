import * as React from 'react';

import { Backdrop, Modal, Fade, Typography, Button, Container } from '@mui/material';
import css from './style.module.css';
import { ModalBox } from './TransitionsModal.style';

export default function TransitionsModal({
  children,
  openModal,
  setOpenModal,
  title,
  closeOnOverlay,
  btnText,
  btnOnClick,
}) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={closeOnOverlay ? () => setOpenModal(false) : undefined}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <ModalBox>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontWeight: 'bold', textDecoration: 'underline' }}
            >
              {title}
            </Typography>
            {children}
            {btnText && (
              <Container
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  variant="contained"
                  onClick={btnOnClick}
                  style={{ marginTop: '1rem' }}
                  className={css['button']}
                >
                  {btnText}
                </Button>
              </Container>
            )}
          </ModalBox>
        </Fade>
      </Modal>
    </div>
  );
}
