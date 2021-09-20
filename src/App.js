import React  from "react"; 
import axios from 'axios';
import "./style.css"

 class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locationResult: {},
      searchQuery: '',
      showLocInfo: false
    };
  }

  getLocFun = async (event) => {
      event.preventDefault();

      await this.setState({
        searchQuery: event.target.city.value 
      })

      let reqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.searchQuery}&format=json`

      let locResults = await axios.get(reqUrl);

      this.setState({
        locationResult: locResults.data[0],
        showLocInfo: true
      })

    console.log('aaaaaaaa', locResults)
    console.log('dddddddd', locResults.data)
    console.log('dddddddd', locResults.data[0])
    }

  render() {
    return (
      <div>
        <h1>City Explorer</h1>
        <form onSubmit ={this.getLocFun} className="form">
          <input type = 'text' name = 'city'/>
          <input type = 'submit' name = 'get city info'/>
        </form>
        <div className="result">
        {this.state.showLocInfo &&
        <>
        
        <p className="cityName">City name: {this.state.searchQuery}</p>
        <p className="latC">latitude: {this.state.locationResult.lat}</p>
        <p className="longC">longitude: {this.state.locationResult.lon}</p>
        <img src = {`https://maps.locationiq.com/v3/staticmap?key=pk.e5c4cc0c12872b86c028374a9ac61865&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=15&size=700x500`} alt="city" className="map"/>
        </>
        }
        </div>
      </div>
    )
  }
}
export default App
