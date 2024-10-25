import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const getMaxVisibleItems = (containerWidth) => {
  if (containerWidth < 300) return 1;  
  if (containerWidth < 500) return 2;  
  return 3;
};

export const ExpandedList = ({ list, item }) => {
  const [expanded, setExpanded] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  const maxVisibleItems = expanded ? list.length : getMaxVisibleItems(containerWidth);
  const visibleItems = list.slice(0, maxVisibleItems);
  const remainingItems = list.length - maxVisibleItems;

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const newWidth = entries[0].contentRect.width;
        setContainerWidth(newWidth);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

	const renderListItem = useCallback((listItem, index) => (
    <Box key={index} component={motion.div} layout>
      {item(listItem)}
    </Box>
  ), [item]);


  return (
    <Box ref={containerRef} display='flex' flexWrap='wrap' gap={1} sx={{ overflow: 'hidden', width: '100%'}}>
			<AnimatePresence initial={false}>
				<Box component={motion.div} layout display="flex" flexWrap="wrap" alignItems='center' gap={1}  >
					{visibleItems.map(renderListItem)}

					{!expanded && remainingItems > 0 && (
						<Box 
							component={motion.div} 
							layout 
							initial={{ opacity: 0 }} 
							animate={{ opacity: 1 }} 
							exit={{ opacity: 0 }} 
							onClick={() => setExpanded(true)} 
							sx={{direction: 'ltr', cursor: 'pointer'}}
						>
							+{remainingItems} more
						</Box>
					)}

				</Box>

      {expanded && (
				<Box 
					component={motion.div}
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: 'auto', opacity: 1 }}
					exit={{ height: 0, opacity: 0 }}
					transition={{ duration: 0.4 }}
					onClick={() => setExpanded(false)} 
					sx={{ direction: 'ltr', cursor: 'pointer', padding: '0 8px' }}
				>
					Show Less
				</Box>
      )}
			</AnimatePresence>
    </Box>
  );
};
