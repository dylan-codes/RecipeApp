const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8080;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* app.use("/api/goals", require("./routes/goalRoutes")); */
/* app.use("/api/search", require("./routes/searchRoutes")); */
app.use("/api/recipes", require("./routes/recipeRoutes"));
app.use("/api/ingredients", require("./routes/ingredientRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get('/', (req, res) => res.send("Please set to production"))
}

app.use(errorHandler);

app.listen(PORT, console.log(`Server started on port ${PORT}`));
