//the homepage. Rendered from __dirname + '/'
var Home = (props) => (

  <div className="homepage">
    <Header />
    {/* img seperating green welcome div from the header
      implemented poorly currently. Needs a listener to update the width on a
      window resize */}
    <div><img className="center-block" style={{width: window.innerWidth}} src="imgs/bgsh.jpg"></img></div>
    {/* green welcome div at the bottom of the home page */}
    <div className="homebox">
      <div className="homeIntro center-block">
        <p>Welcome to FoodFairy.com! Just tell the Fairy what ingredients you have lying around your house and she'll whip you up a recipe in no time!</p>
      </div>
    </div>
  </div>
)

window.Home = Home;
