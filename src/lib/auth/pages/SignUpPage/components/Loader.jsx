import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

const Loader = ({ loading }) => {
    useEffect(() => {
        if (loading) {
            // Disable scrolling
            document.body.style.overflow = "hidden";
        } else {
            // Enable scrolling
            document.body.style.overflow = "auto";
        }

        // Clean up when the component unmounts or `loading` changes
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [loading]);

    if (!loading) return null; // Don't render the loader if not loading

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: To create a modal-like overlay
                zIndex: 1000, // Make sure it's on top
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default Loader;
