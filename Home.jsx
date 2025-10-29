import React from "react";
import { Box, VStack, Text, Button, Image, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Full-page Hero Section */}
      <Box
        position="relative"
        w="100%"
        h={{ base: "100vh", md: "100vh" }}
        overflow="hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
          alt="Environment"
          objectFit="cover"
          w="100%"
          h="100%"
          transition="all 0.5s"
          _hover={{ transform: "scale(1.05)" }}
        />
        <VStack
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          justifyContent="center"
          alignItems="center"
          bg="rgba(0,128,0,0.3)"
          color="white"
          textAlign="center"
          p={4}
        >
          <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold">
            🌍 Welcome to EcoAgent
          </Text>
          <Text fontSize={{ base: "md", md: "xl" }} mt={2} fontStyle="italic">
            "Thinks like a climate expert, responds like an agent of change"
          </Text>
          <Text maxW="600px" mt={4} fontSize={{ base: "sm", md: "lg" }}>
            EcoAgent is an intelligent environmental companion that observes, analyzes,
            and acts to protect our planet. It monitors global climate patterns, air quality,
            and pollution levels in real-time—then autonomously recommends sustainable actions.
            Think of it as an AI that thinks like an environmental scientist and acts like
            Earth's guardian, helping communities anticipate risks, reduce impact, and build a greener future.
          </Text>
          <HStack mt={6} spacing={4}>
            <Button
              colorScheme="green"
              size="lg"
              _hover={{ transform: "scale(1.05)" }}
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
            <Button
              colorScheme="teal"
              size="lg"
              _hover={{ transform: "scale(1.05)" }}
              onClick={() => navigate("/advisor")}
            >
              AI Advisor
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default Home;
