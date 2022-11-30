const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

const oneRecipe = {
  title: "Escondidinho de Charque",
  level: "Easy Peasy",
  ingredients: ["0.5kg de macaxeira", "0.5kg de charque", "250ml de leite"],
  cuisine: "Brazilian",
  dishType: "other",
  image: "",
  duration: 30,
  creator: "vó",
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create(oneRecipe)
      .then((recipe) =>
        console.log("The recipe is saved and your title is: ", recipe.title)
      )
      .catch((error) =>
        console.log("An error happened while saving a new recipe:", error)
      );

    Recipe.insertMany(data)
      .then((recipe) => console.log("The recipes are saved"))
      .then(() => {
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        )
          .then((recipe) => console.log(`Recipe ${recipe.title} updated`))
          .catch((error) =>
            console.log("An error happened while update a recipe:", error)
          );
        Recipe.deleteOne({ title: "Carrot Cake" })
          .then((recipe) => console.log(`Recipe deleted`))
          .then(()=> mongoose.disconnect())
          .catch((error) =>
            console.log("An error happened while delete a recipe:", error)
          );
      })
      .catch((error) =>
        console.log("An error happened while saving a list of recipes:", error)
      );
  })
  
  .catch((error) => {
    console.error("Error connecting to the database", error);
})

  
  
  


