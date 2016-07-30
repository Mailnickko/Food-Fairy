class LargeRecipeCard extends React.Component {
  //props: recipe - the recipe data to be shown; taken from the API
  //       searchInstructions - function with ajax call to pull recipe steps from API
  //                            by the recipe ID
  //       searchSummary - function with ajax call to retrieve the description of the
  //                       recipe
  //       searchIngredients - function with ajax call to retrieve the ingrediants of
  //                           of a recipe. CURRENTLY UNUSED.
  constructor(props){
    super(props);
    this.state = {
      id: this.props.recipe.id,
      steps: []
    }
  }

  //runs when component is rendered (react calls this function before rendering)
  componentWillMount(){

    //retrtieves the instructions and creates the steps array from the data
    this.props.searchInstructions(this.state.id, (recipes)=>{
      var concatRecipe = [];
      recipes.forEach(function(recipe){
        concatRecipe = concatRecipe.concat(recipe.steps);
      })
      this.setState({
        steps: concatRecipe
      })
    })

    //ingredients as future functionality? this can be obtained
    //from "Get Product Data" endpoint and searchIngredients has
    //already been added to the searchSpontacular.js with that endpoint

    //retrieves the summary/description for this recipe
    this.props.searchSummary(this.state.id, (data)=>{
      this.setState({ summary: data.summary })
    })
  }

  //function to save the recipe to the mongo database
  saveRecipe(){
    $.ajax({
      url: '/api/recipes',
      type: 'POST',
      data: { title: this.props.recipe.title,
              image: this.props.recipe.image,
              summary: this.state.summary,
              steps: JSON.stringify(this.state.steps),
              likes: this.props.recipe.likes },
      success: function(data) {
        console.log('success', data);
      }.bind(this),
      error: function() {
        console.log('failure')
      }
    });
  }

  render(){
    return(
      <div>
        {/* the backdrop that covers the rest of the page when the large recipe
          card is rendered - does not need content. It's styled to an absolute position
          to take up the entire screen */}
        <div className="recipe-card-large-backdrop"></div>
        {/* the actual large recipe card */}
        <div className="recipe-card-large">
          <div>
            <div className="recipeTitle text-center">{this.props.recipe.title}</div>
            <img className="recipeImg center-block" src={this.props.recipe.image} alt="" />
          </div>
          <div className="recipeBody">
            {/* react does not like html being added from unknown sources to its rendered
              pages. This is to protect from attacks. In our case, we're forcing it to
              accept html from the Ajax query to the API. This could likely be implemented
              in a different way */}
            <div dangerouslySetInnerHTML={{__html: this.state.summary}} />
            <ol>
              {/* loops through all the recipe steps and adds them to an ordered list */}
              {this.state.steps.map((step)=>{ return (<li>{step.step}</li>)})}
            </ol>
            <div className="saveorlike">
              <button className='saveRecipeButton' onClick={this.saveRecipe.bind(this)}>Save Recipe</button>
              <div className="recipeLikes"><img src="imgs/likes.png" /> {this.props.recipe.likes}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

window.LargeRecipeCard = LargeRecipeCard;
