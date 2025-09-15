// src/components/Layout/Layout.js
import React, { useState } from "react";
import { Box, Toolbar, IconButton, AppBar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../Sidebar/SideBar";
import { Outlet, useLocation } from "react-router-dom";


const pageTitles = {
    "/forms": "Saved Forms",
    "/": "Create Form",
    "/edit-form": "Edit Form",
    "/view-form": "View Form",
};

export default function Layout() {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;


    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: "flex" }}>
            {/* Top AppBar with Hamburger */}
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {pageTitles[currentPath] || "Form Manager"}
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Sidebar Drawer (collapsible) */}
            <Sidebar open={open} onClose={handleDrawerToggle} />

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, mt: 8 }}>
                <Outlet />
            </Box>
        </Box>
    );
}
