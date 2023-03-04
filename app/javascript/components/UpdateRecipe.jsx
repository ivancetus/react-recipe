import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateRecipe = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instruction: "",
    image: "",
  });

  useEffect(() => {
    const url = `/api/v1/show/${params.id}`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setRecipe({ ...res, instruction: stripHtmlEntities(res.instruction) }))
  }, []);

  const handleChange = (event) => {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };

  const addHtmlEntities = (str) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };

  const stripHtmlEntities = (str) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `/api/v1/update/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const body = { ...recipe, instruction: stripHtmlEntities(recipe.instruction) };

    fetch(url, {
      method: "PATCH",
      headers: {
        "X-CSRF-TOKEN": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/recipes"))
      .catch((error) => console.log(error.message));
  };

  const recipeInstruction = addHtmlEntities(recipe.instruction);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Update recipe here, add steps, ingredients, image url, etc.
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="recipeName">Recipe name</label>
              <input
                type="text"
                name="name"
                id="recipeName"
                defaultValue={recipe.name}
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="recipeIngredients">Ingredients</label>
              <input
                type="text"
                name="ingredients"
                id="recipeIngredients"
                defaultValue={recipe.ingredients}
                className="form-control"
                required
                onChange={handleChange}
              />
              <small id="ingredientsHelp" className="form-text text-muted">
                Separate each ingredient with a comma.
              </small>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="recipeName">Recipe image url (optional)</label>
              <input
                type="text"
                name="image"
                id="recipeImage"
                defaultValue={recipe.image}
                className="form-control"
                onChange={handleChange}
              />
              <small id="imageHelp" className="form-text text-muted">
                Url should end with .jpg / .png , etc. Prefer 16:9, less than 1mb.
              </small>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="instruction">Preparation Instruction</label>
              <textarea
                name="instruction"
                id="recipeInstruction"
                defaultValue={recipe.instruction}
                className="form-control"
                rows="5"
                required
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn custom-button mb-3">
              Update Recipe
            </button>
            <Link to="/recipes" className="btn btn-link mb-3">
              Back to recipes
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateRecipe;
