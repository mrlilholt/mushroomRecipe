import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

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
        color: "white",
        textAlign: "center",
        padding: 3,
      }}
    >
      <Typography variant="h3" gutterBottom>
        🍄 Mushroom Recipe Finder
      </Typography>

      {/* Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
        <TextField
          label="Search for Mushrooms"
          variant="outlined"
          color="secondary"
          sx={{ backgroundColor: "white", borderRadius: 1, marginRight: 1 }}
          onChange={(e) => setMushroom(e.target.value)}
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
      <Grid container spacing={3} justifyContent="center">
        {recipes.map((recipe, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: 3,
                boxShadow: 5,
                backgroundColor: "#f5f5f5",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={recipe.image_url}
                alt={recipe.title}
              />
              <CardContent>
                <Typography variant="h6" component="div" color="primary">
                  {recipe.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ⭐ {recipe.rating} stars ({recipe.ratings_count} reviews)
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  href={recipe.link}
                  target="_blank"
                  sx={{ marginTop: 1 }}
                >
                  View Recipe
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App;
