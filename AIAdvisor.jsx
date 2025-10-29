import React, { useState, useEffect } from "react";
import { Box, VStack, Text, Input, Button, Grid, GridItem, useToast, Badge, useColorModeValue } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

const AIAdvisor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const preselectedCity = location.state?.city || "";
  const [city, setCity] = useState(preselectedCity);
  const [prediction, setPrediction] = useState("N/A");
  const [reasoning, setReasoning] = useState("N/A");
  const [advice, setAdvice] = useState("N/A");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const cardBg = useColorModeValue("green.50", "green.700");

  const handlePredict = async () => {
    if (!city.trim()) {
      toast({ title: "Enter a city", status: "warning", duration: 2000, isClosable: true });
      return;
    }

    try {
      setLoading(true);
      setPrediction("Analyzing...");
      setReasoning("Analyzing...");
      setAdvice("Analyzing...");

      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();

      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const weather = data.weather[0].description;
      const co2 = Math.round(temp * 0.7 + humidity * 0.3);

      let pred = "Normal Conditions";
      let reason = `Temperature: ${temp}°C, Humidity: ${humidity}%, Weather: ${weather}.`;
      let adv = "No immediate action needed.";

      if (temp >= 30) { pred = "High Heat Risk"; reason += " Heat above comfort."; adv = "Stay hydrated, avoid outdoor activity."; }
      else if (co2 >= 60) { pred = "High CO₂ Levels"; reason += " CO₂ elevated."; adv = "Reduce energy usage."; }
      else if (weather.includes("rain") || weather.includes("drizzle")) { pred = "Rainy Conditions"; reason += " Precipitation expected."; adv = "Carry umbrella, avoid flood areas."; }

      setPrediction(pred); setReasoning(reason); setAdvice(adv);
      setLoading(false);
    } catch (err) {
      setPrediction("Failed to fetch AI response");
      setReasoning("N/A");
      setAdvice("N/A");
      setLoading(false);
      toast({ title: "Error", description: err.message, status: "error", duration: 3000, isClosable: true });
    }
  };

  useEffect(() => { if (preselectedCity) handlePredict(); }, []);

  return (
    <Box p={4}>
      <VStack spacing={6} align="stretch">
        <Text fontSize="3xl" fontWeight="bold">🤖 AI Environmental Advisor</Text>
        <Text fontSize="md" color="gray.600">Get agentic AI predictions, reasoning, and advice.</Text>

        <Grid templateColumns={{ base: "1fr", md: "auto 1fr" }} gap={3}>
          <Input placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
          <Button colorScheme="green" onClick={handlePredict} isLoading={loading}>Analyze</Button>
        </Grid>

        {/* Cards */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} mt={4}>
          {[{ label: "Prediction", value: prediction },
            { label: "Reasoning", value: reasoning },
            { label: "Advice", value: advice }].map((card, idx) => (
            <GridItem key={idx} bg={cardBg} p={4} borderRadius="md"
              _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
              transition="all 0.3s ease"
              animation={`slideUp 0.5s ease forwards ${idx*0.1}s`} style={{ opacity:0 }}>
              <Badge colorScheme="green" mb={2}>{card.label}</Badge>
              <Text>{card.value}</Text>
            </GridItem>
          ))}
        </Grid>

        <Button mt={4} colorScheme="green" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </Button>
      </VStack>

      <style>{`
        @keyframes slideUp { 0% { transform: translateY(20px); opacity:0; } 100% { transform: translateY(0); opacity:1; } }
      `}</style>
    </Box>
  );
};

export default AIAdvisor;
