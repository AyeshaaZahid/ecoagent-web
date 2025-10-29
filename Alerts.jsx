import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  Grid,
  GridItem,
  Badge,
  Input,
  Button,
  HStack,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";

const Alerts = () => {
  const [city, setCity] = useState("Lahore"); // default city
  const [weatherData, setWeatherData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const toast = useToast();
  const cardBg = useColorModeValue("orange.50", "orange.700");

  // Fetch Weather
  const fetchWeather = async (searchCity) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeatherData(data);

      // Generate Alerts
      const generatedAlerts = generateAlerts(data);
      setAlerts(generatedAlerts);
    } catch (err) {
      toast({
        title: "Error fetching weather",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setWeatherData(null);
      setAlerts([]);
    }
  };

  // Improved Agentic Alerts Logic
  const generateAlerts = (data) => {
    const alertList = [];
    const temp = data.main.temp;
    const wind = data.wind.speed;
    const weather = data.weather[0].description;
    const humidity = data.main.humidity;

    // Demo CO₂ formula
    const co2 = Math.round(temp * 0.7 + humidity * 0.3);

    if (temp >= 25) alertList.push({ type: "🔥 Heat Alert", message: `Temperature is ${temp}°C. Stay hydrated!` });
    if (wind >= 3) alertList.push({ type: "🌬️ Wind Alert", message: `Wind speed is ${wind} m/s. Secure outdoor items.` });
    if (weather.includes("rain") || weather.includes("drizzle")) alertList.push({ type: "🌧️ Rain Alert", message: "Rain expected. Avoid outdoor activities." });
    if (co2 >= 60) alertList.push({ type: "🌱 High CO₂ Alert", message: `CO₂ footprint is high (${co2}/100). Reduce energy usage.` });

    if (alertList.length === 0) alertList.push({ type: "✅ All Clear", message: "No environmental alerts for now." });

    return alertList;
  };

  // Initial fetch for default city
  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <Box p={4}>
      <VStack spacing={6} align="stretch">
        <Text fontSize="3xl" fontWeight="bold">🚨 EcoAgent Alerts</Text>
        <Text fontSize="md" color="gray.600">
          Agent proactively monitors conditions and generates real-time alerts.
        </Text>

        {/* City input */}
        <HStack spacing={3}>
          <Input
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            maxW="250px"
          />
          <Button
            colorScheme="orange"
            onClick={() => {
              if (city.trim() === "") {
                toast({
                  title: "Enter a city",
                  status: "warning",
                  duration: 2000,
                  isClosable: true,
                });
                return;
              }
              fetchWeather(city.trim());
            }}
          >
            Check Alerts
          </Button>
        </HStack>

        {/* Alerts Grid */}
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={6}
        >
          {alerts.map((alert, index) => (
            <GridItem
              key={index}
              bg={cardBg}
              p={4}
              borderRadius="md"
              _hover={{ transform: "scale(1.03)", boxShadow: "lg" }}
              transition="0.3s"
              animation={`slideIn 0.5s ease forwards ${index * 0.1}s`}
              style={{ opacity: 0 }}
            >
              <Badge colorScheme="orange" mb={2}>{alert.type}</Badge>
              <Text>{alert.message}</Text>
            </GridItem>
          ))}
        </Grid>
      </VStack>

      {/* Slide-in animation CSS */}
      <style>
        {`
          @keyframes slideIn {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default Alerts;
