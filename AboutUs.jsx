import { Box, Heading, Text, VStack, SimpleGrid } from "@chakra-ui/react";

const teamMembers = [
  { name: "Rameen Fatima", role: "Frontend Developer" },
  { name: "Ayesha Zahid", role: "Backend Developer" },
  { name: "Aneela Fatima", role: "AI Specialist" },
];

const About = () => {
  return (
    <Box bg="green.50" minH="100vh" display="flex" flexDirection="column">
      <VStack spacing={6} p={6} flex="1" maxW="1000px" mx="auto">
        <Heading textAlign="center">🌿 About EcoAgent</Heading>
        <Text textAlign="center" maxW="700px" color="green.800" lineHeight="1.6">
          EcoAgent is an intelligent environmental companion that observes, analyzes, and acts to protect our planet. 
          Our mission is to empower individuals and communities to make sustainable decisions and reduce their environmental impact. 
          Think of us as an AI that thinks like an environmental scientist and acts like Earth's guardian.
        </Text>

        <Heading size="lg" mt={4}>👥 Meet the Team</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} w="100%">
          {teamMembers.map((member, index) => (
            <Box
              key={index}
              p={4}
              bg="white"
              rounded="md"
              shadow="md"
              _hover={{ transform: "scale(1.03)", shadow: "lg", transition: "0.3s" }}
              textAlign="center"
            >
              <Text fontWeight="bold">{member.name}</Text>
              <Text color="green.700">{member.role}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>

      {/* Footer */}
      <Box bg="green.600" color="white" py={4} textAlign="center">
        <Text fontWeight="bold">Team: EcoSapiens</Text>
        <Text fontSize="sm">© 2025 EcoAgent. All rights reserved.</Text>
      </Box>
    </Box>
  );
};

export default About;
