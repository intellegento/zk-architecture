import { useState, useCallback } from 'react';

const useOpen = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const toggleOpen = useCallback(() => setOpen(!open), [open]);

  return { open, handleOpen, handleClose, toggleOpen };
};

export default useOpen;
