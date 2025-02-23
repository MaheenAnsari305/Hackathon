import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config';

// Material Icons
import PeopleIcon from '@mui/icons-material/People';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import RoomIcon from '@mui/icons-material/Room';
import BookingIcon from '@mui/icons-material/Book';
import PaymentIcon from '@mui/icons-material/Payment';
import WorkIcon from '@mui/icons-material/Work';


import UserManagement from '../Components/UserManagement';
import CustomerManagement from '../Components/CustomerManagement';
import BookingManagement from '../Components/BookingManagement';
import PaymentManagement from '../Components/PaymentManagement';
import ServiceManagement from '../Components/ServiceManagement';
import RoomAvailable from '../Components/RoomAvailable';
import CustomerProfile from '../Components/CustomerProfile';


const drawerWidth = 240;

const pages = [
  {
    name: 'Users',
    route: 'Users',
    icon: <PeopleIcon />,
    children: [
      { name: 'UserManagement', route: 'usermanagement' },
    ],
  },
  {
    name: 'Customers',
    route: 'Customers',
    icon: <PeopleIcon />,
    children: [
      { name: 'CustomerManagement', route: 'customermanagement' },
      { name: 'CustomerProfile', route: 'customerprofile' },
    ],
  },
  {
    name: 'Rooms',
    route: 'Rooms',
    icon: <RoomIcon />,
    children: [
      { name: 'RoomAvailable', route: 'roomavailable' },
    ],
  },
  {
    name: 'Bookings',
    route: 'Bookings',
    icon: <BookingIcon />,
    children: [
      { name: 'BookingManagement', route: 'bookingmanagement' },
    ],
  },
  {
    name: 'Payments',
    route: 'Payments',
    icon: <PaymentIcon />,
    children: [
      { name: 'PaymentManagement', route: 'paymentmanagement' },
    ],
  },
  {
    name: 'Staff',
    route: 'Staff',
    icon: <WorkIcon />,
    children: [
      { name: 'StaffManagement', route: 'staffmanagement' },
    ],
  },
  {
    name: 'Services',
    route: 'Services',
    icon: <RoomServiceIcon />,
    children: [
      { name: 'ServiceManagement', route: 'servicemanagement' },
    ],
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = React.useState({});
  const [userRole, setUserRole] = React.useState('client'); 
  
  const handleDropdownToggle = (section) => {
    setOpenDropdown((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        navigate('/login');
      })
      .catch((error) => {
        console.error("Error signing out", error.message);
      });
  };

  const renderMenuItems = (role) => {
    return pages.map((obj, index) => {
      if (role === 'client' && obj.name === 'Staff') {
        return null; // Clients don't see Staff section
      }

      return (
        <React.Fragment key={index}>
          <ListItemButton
            onClick={() => handleDropdownToggle(obj.name.toLowerCase())}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingY: 1.5,
              '&:hover': { backgroundColor: '#4CAF50' },
            }}
          >
            <ListItemIcon sx={{ minWidth: 'auto', color: 'white' }}>
              {obj.icon}
            </ListItemIcon>
            <ListItemText primary={obj.name} sx={{ fontWeight: 'bold', color: 'white' }} />
            <ListItemIcon sx={{ minWidth: 'auto', color: 'white' }}>
              {openDropdown[obj.name.toLowerCase()] ? (
                <ExpandLessIcon sx={{ color: 'white' }} />
              ) : (
                <ExpandMoreIcon sx={{ color: 'white' }} />
              )}
            </ListItemIcon>
          </ListItemButton>

          {openDropdown[obj.name.toLowerCase()] && (
            <div>
              {obj.children.map((child, childIndex) => (
                <ListItem key={childIndex} disablePadding>
                  <ListItemButton
                    sx={{
                      pl: 4,
                      '&:hover': { backgroundColor: '#66BB6A' },
                    }}
                    onClick={() => {
                      navigate(`/dashboard/${child.route}`);
                    }}
                  >
                    <ListItemText primary={child.name} sx={{ color: 'white' }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </div>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: '#777799',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div" sx={{ color: 'white' }}>
            <h5>HOTEL MANAGEMENT SYSTEM</h5>
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#F44886',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#777799',
            color: 'white',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>{renderMenuItems(userRole)}</List>
        <Divider />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          ml: `${drawerWidth}px`,
        }}
      >
        
        <Routes>
          {/* Admin Pages */}
          <Route path="usermanagement" element={<UserManagement />} />
          <Route path="customermanagement" element={<CustomerManagement />} />
          <Route path="bookingmanagement" element={<BookingManagement />} />
          <Route path="paymentmanagement" element={<PaymentManagement />} />
     
          <Route path="servicemanagement" element={<ServiceManagement />} />
          
          {/* Client Pages */}
          <Route path="roomavailable" element={<RoomAvailable />} />
          <Route path="customerprofile" element={<CustomerProfile />} />
        </Routes>
      </Box>
    </Box>
  );
}
