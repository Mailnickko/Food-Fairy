// SearchPage renders the SearchBox and RecipeList components
class SearchPage extends React.Component {
  // props saves the data that returns in the searchAPI query
  // searchAPI method is called on the searchBox component
  constructor(props){
    super(props);
    this.state={
      recipeList: []
    }
  }

  //used as a callback passed to the searchbox - it gets access to the recipe from
  //  inside the searchbox component
  createRecipeList(list) {
    this.setState({
      recipeList: list
    });
  }

  render(){
    return(
      <div>
        <Header />
        <div className='searchpage'>
          {/* passing callback to the searchAPI component to access the result of the searchAPI query */}
          <SearchBox searchAPI={this.props.searchAPI} callback={this.createRecipeList.bind(this)}/>
          <div className="recipe-list">
            <RecipeList recipeList={this.state.recipeList}/>
          </div>
        </div>
      </div>
    )
  }
}

window.SearchPage = SearchPage;
