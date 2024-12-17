import React, { useState } from "react";
import axios from "axios";
import { Box, Card, CardMedia, Typography, Grid } from "@mui/material";
import { Button } from "@mui/material";

function App() {
  const [mushroom, setMushroom] = useState("");
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `https://mushroomrecipe.onrender.com/search?mushroom=${mushroom}`
      );
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #3f51b5, #5c6bc0)",
        minHeight: "100vh",
        padding: 3,
      }}
    >
      <Typography variant="h3" sx={{ textAlign: "center", color: "white" }}>
        🍄 Mushroom Recipe Finder
      </Typography>

      {/* Search Section */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <input
          type="text"
          placeholder="Search for mushrooms..."
          value={mushroom}
          onChange={(e) => setMushroom(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            marginRight: "8px",
            border: "none",
            width: "300px",
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={fetchRecipes}
        >
          Search
        </Button>
      </Box>

      {/* Recipe Grid */}
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        {recipes.map((recipe, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ position: "relative", borderRadius: 3, overflow: "hidden" }}>
              {/* Background Image */}
              <CardMedia
                component="img"
                height="200"
                image={recipe.image_url}
                alt={recipe.title}
              />
              {/* Overlaying Text */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  background: "rgba(0, 0, 0, 0.6)",
                  color: "white",
                  padding: "10px",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {recipe.title}
                </Typography>
                <Typography variant="body2">
                  ⭐ {recipe.rating} stars ({recipe.ratings_count} reviews)
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  href={recipe.link}
                  target="_blank"
                  sx={{ marginTop: 1, background: "#ff9800" }}
                >
                  View Recipe
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App;

