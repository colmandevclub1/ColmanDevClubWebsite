// NewWeekDialog.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import UrlInputField from '../../../../ui/UrlInputField/UrlInputField';

const EditWeekDialog = ({ open, onClose, onAddWeek,onUpdateWeek, newWeek, setNewWeek }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewWeek((prevWeek) => ({
      ...prevWeek,
      [name]: value,
    }));
  };

  const handleToggleVisibility = (event) => {
    setNewWeek((prevWeek) => ({
      ...prevWeek,
      is_visible: event.target.checked,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{newWeek.id ? "Edit Week" : "Create a New Week"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Week Title"
          fullWidth
          value={newWeek.title}
          onChange={handleInputChange}
          size="small"
        />
        <TextField
          margin="dense"
          name="subject"
          label="Subject"
          fullWidth
          value={newWeek.subject}
          onChange={handleInputChange}
          size="small"
        />
        <TextField
          margin="dense"
          name="order_num"
          label="Order Number"
          fullWidth
          value={newWeek.order_num || ''}
          onChange={handleInputChange}
          size="small"
          type="number"
        />
        <UrlInputField 
          label="Presentation Links"
          urlString={newWeek.presantaion_links}
          setUrlString={(urls) => setNewWeek(prev => ({ ...prev, presantaion_links: urls }))}
        />
        <UrlInputField 
          label="YouTube Links"
          urlString={newWeek.youtube_links}
          setUrlString={(urls) => setNewWeek(prev => ({ ...prev, youtube_links: urls }))}
        />
        <UrlInputField 
          label="Project Link"
          urlString={newWeek.project_link}
          setUrlString={(urls) => setNewWeek(prev => ({ ...prev, project_link: urls }))}
        />
        <UrlInputField 
          label="Exercise Link"
          urlString={newWeek.exercise_link}
          setUrlString={(urls) => setNewWeek(prev => ({ ...prev, exercise_link: urls }))}
        />
        <UrlInputField 
          label="Other Links"
          urlString={newWeek.other_links}
          setUrlString={(urls) => setNewWeek(prev => ({ ...prev, other_links: urls }))}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newWeek.is_visible}
              onChange={handleToggleVisibility}
              color="primary"
              sx={{border: '1px solid primary.main'}}
            />
          }
          label="Visible"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" size="small">
          Cancel
        </Button>
        <Button onClick={newWeek.id ? onUpdateWeek : onAddWeek} color="primary" size="small">
            {newWeek.id ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditWeekDialog;
