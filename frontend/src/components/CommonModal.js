import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const CommonModal = ({ 
  open, 
  onClose, 
  title, 
  content, 
  actions,
  maxWidth = 'md',
  fullWidth = true,
  showCloseButton = true,
  type = 'default' 
}) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderRadius: 2,
          ...(type === 'image' && {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            maxWidth: '90vw',
            maxHeight: '90vh',
          })
        }
      }}
    >
      {(title || showCloseButton) && (
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: title ? 2 : 1,
          ...(type === 'image' && {
            position: 'absolute',
            top: 8,
            right: 8,
            p: 0,
            zIndex: 1,
            backgroundColor: 'transparent',
          })
        }}>
          {title && type !== 'image' && (
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
          )}
          {showCloseButton && (
            <IconButton 
              onClick={handleClose}
              sx={{ 
                ...(type === 'image' && {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  }
                })
              }}
            >
              <Close />
            </IconButton>
          )}
        </DialogTitle>
      )}

      <DialogContent sx={{ 
        ...(type === 'image' && {
          p: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }),
        ...(type === 'purchase' && {
          textAlign: 'center',
          py: 4,
        })
      }}>
        {content}
      </DialogContent>

      {actions && (
        <DialogActions sx={{ 
          px: 3, 
          pb: 3,
          ...(type === 'purchase' && {
            justifyContent: 'center',
          })
        }}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CommonModal;
