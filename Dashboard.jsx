import React, { useState, useEffect } from "react";
import { Box, VStack, Text, Input, Button, Grid, GridItem, useToast, Badge, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [city, setCity] = useState("Lahore");
  const [weatherData, setWeatherData] = useState(null);
  const [ecoScore, setEcoScore] = useState(0);
  const [co2Footprint, setCo2Footprint] = useState(0);
  const [tempHistory, setTempHistory] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const cardBg = useColorModeValue("green.50", "green.700");

  const fetchWeather = async (searchCity) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeatherData(data);

      const score = Math.max(0, 100 - Math.round(data.main.temp + data.main.humidity));
      const co2 = Math.round(data.main.temp * 0.7 + data.main.humidity * 0.3);
      setEcoScore(score);
      setCo2Footprint(co2);

      setTempHistory((prev) => [...prev.slice(-6), data.main.temp]);
    } catch (err) {
      toast({ title: "Error", description: err.message, status: "error", duration: 3000, isClosable: true });
      setWeatherData(null);
      setEcoScore(0);
      setCo2Footprint(0);
      setTempHistory([]);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <Box p={4}>
      <VStack spacing={6} align="stretch">
        <Text fontSize="3xl" fontWeight="bold">🌍 EcoAgent Dashboard</Text>
        <Text>Real-time environmental insights & sustainability advice.</Text>

        <Grid templateColumns={{ base: "1fr", md: "auto 1fr" }} gap={3}>
          <Input placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
          <Button colorScheme="green" onClick={() => fetchWeather(city)}>Check Weather</Button>
        </Grid>

        {weatherData && (
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
            {/* Weather Info */}
            <Box bg={cardBg} p={4} borderRadius="md" _hover={{ transform: "scale(1.03)", boxShadow: "xl" }} transition="all 0.3s">
              <Text fontWeight="bold">{weatherData.name}, {weatherData.sys.country}</Text>
              <Text>🌡️ Temperature: {weatherData.main.temp}°C</Text>
              <Text>💧 Humidity: {weatherData.main.humidity}%</Text>
              <Text>🌬️ Wind Speed: {weatherData.wind.speed} m/s</Text>
              <Text>🌦️ Condition: {weatherData.weather[0].description}</Text>
            </Box>

            {/* Eco Score & CO2 */}
            <Box bg={cardBg} p={4} borderRadius="md" _hover={{ transform: "scale(1.03)", boxShadow: "xl" }} transition="all 0.3s">
              <Text>♻️ Eco Score: {ecoScore}/100</Text>
              <Text>🌱 CO₂ Footprint: {co2Footprint}/100</Text>
            </Box>

            {/* Temperature Graph */}
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <Box bg={cardBg} p={4} borderRadius="md">
                <Line
                  data={{
                    labels: tempHistory.map((_, idx) => `T-${tempHistory.length - idx}`),
                    datasets: [
                      {
                        label: "Temperature (°C)",
                        data: tempHistory,
                        borderColor: "green",
                        backgroundColor: "rgba(0,128,0,0.2)",
                      },
                    ],
                  }}
                  options={{ responsive: true, plugins: { legend: { position: "top" } } }}
                />
              </Box>
            </GridItem>
          </Grid>
        )}

        {/* Navigate to AI Advisor */}
        <Button mt={4} colorScheme="green" onClick={() => navigate("/advisor", { state: { city } })}>
          Analyze in AI Advisor
        </Button>
      </VStack>
    </Box>
  );
};

export default Dashboard;
