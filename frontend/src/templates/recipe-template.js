import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby"
import RecipesList from "../components/RecipesList"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { GatsbyImage } from "gatsby-plugin-image"
import { BsClock, BsClockHistory, BsPeople } from "react-icons/bs"
import slugify from "slugify"

import axios from "axios"

const RecipeTemplate = ({ pageContext }) => {
  let endpoint = "https://tiramisu-backend.herokuapp.com/api/recipes/".concat(
    pageContext.RecipeID
  )
  const [recipe, setRecipe] = useState([])

  useEffect(() => {
    fetch(endpoint)
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        setRecipe(resultData.data)
      })
  }, [])

  const handleDelete = event => {
    event.preventDefault()

    axios
      .delete(endpoint)
      .then(res => {
        window.location = "/"
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Layout>
      <SEO title={recipe.RecipeName} description={recipe.Description} />
      <main className="page">
        <div className="recipe-page">
          <section className="recipe-hero">
            <img
              src={recipe.PhotoURL}
              width="400"
              height="400"
              style={{
                border: "3px solid #9db1b7",
                borderRadius: "10px",
                objectFit: "cover",
              }}
              alt={recipe.RecipeName}
            />
            <article className="recipe-info">
              <h3>{recipe.RecipeName}</h3>
              <p>{recipe.Description}</p>

              <div className="recipe-icons">
                <article>
                  <BsClock />
                  <h5>prep time</h5>
                  <p>{recipe.prepTime} min.</p>
                </article>
                <article>
                  <BsClockHistory />
                  <h5>cook time</h5>
                  <p>{recipe.cookTime} min.</p>
                </article>
                <article>
                  <BsPeople />
                  <h5>Score</h5>
                  <p>{recipe.Score} </p>
                </article>
              </div>

              <p className="recipe-tags">
                Tags :
                {recipe.Category?.map((tag, index) => {
                  const slug = slugify(tag, { lower: true })
                  return (
                    <Link to={`/tags/${slug}`} key={index}>
                      {tag}
                    </Link>
                  )
                })}
              </p>
            </article>
          </section>

          <section className="recipe-content">
            <article>
              <h4>instructions</h4>
              {recipe.recipeProcedure?.map((item, index) => {
                return (
                  <div key={index} className="single-instruction">
                    <header>
                      <p>step {index + 1}</p>
                      <div></div>
                    </header>
                    <p>{item}</p>
                  </div>
                )
              })}
            </article>
            <article className="second-column">
              <div>
                <h4>ingredients</h4>
                {recipe.Ingredient?.map((item, index) => {
                  return (
                    <p key={index} className="single-ingredient">
                      {item}
                    </p>
                  )
                })}
              </div>
            </article>
          </section>
          <button id="delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </main>
    </Layout>
  )
}
export default RecipeTemplate
