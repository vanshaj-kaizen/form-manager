import { Drawer, List, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";


const drawerWidth = 220;

const SideBar = ({ open, onClose }) => {
    return (
        <Drawer variant="permanent"
            open={open}
            onClose={onClose}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
            }}
        >
            <Toolbar />
            <List>

                <ListItemButton component={Link} to="/">
                    <ListItemText primary="Form Builder" />
                </ListItemButton>
                <ListItemButton component={Link} to="/forms">
                    <ListItemText primary="Form Render" />
                </ListItemButton>
            </List>
        </Drawer>
    )
}

export default SideBar;