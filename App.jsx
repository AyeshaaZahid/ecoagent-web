import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box, HStack, Button, Spacer, Text } from "@chakra-ui/react";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import AIAdvisor from "./pages/AIAdvisor";
import AboutUs from "./pages/AboutUs";

const App = () => {
  return (
    <Router>
      <Box>
        {/* Sticky Navbar */}
        <HStack
          bg="green.600"
          p={4}
          color="white"
          position="sticky"
          top="0"
          zIndex="10"
        >
          <Text fontWeight="bold" fontSize="xl">EcoAgent</Text>
          <Spacer />
          <HStack spacing={4}>
            <Button as={Link} to="/" variant="ghost" color="white" _hover={{ bg: "green.500" }}>Home</Button>
            <Button as={Link} to="/dashboard" variant="ghost" color="white" _hover={{ bg: "green.500" }}>Dashboard</Button>
            <Button as={Link} to="/alerts" variant="ghost" color="white" _hover={{ bg: "green.500" }}>Alerts</Button>
            <Button as={Link} to="/advisor" variant="ghost" color="white" _hover={{ bg: "green.500" }}>AI Advisor</Button>
            <Button as={Link} to="/about" variant="ghost" color="white" _hover={{ bg: "green.500" }}>About Us</Button>
          </HStack>
        </HStack>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/advisor" element={<AIAdvisor />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
