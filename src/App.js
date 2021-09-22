import React  from "react"; 
import axios from 'axios';
import "./style.css"

 class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locationResult: {},
      weatherData: {},
      searchQuery: '',
      showLocInfo: false,
      showError: false,
      errorMsg: ''
    };
  }

  getLocFun = async (event) => {
      event.preventDefault();

      await this.setState({
        searchQuery: event.target.city.value 
      })

      let reqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.searchQuery}&format=json`

      let reqUr2 = `${process.env.REACT_APP_SERVER_LINK}/getWeather?cityNameSelect=${this.state.searchQuery}`

      let locResults = await axios.get(reqUrl);

      let weatherResults = await axios.get(reqUr2);

      try {
      this.setState({
        locationResult: locResults.data[0],
        weatherData: weatherResults.data,
        showLocInfo: true,
        showError: false
      })
    } catch(error) {
        this.setState({
          showError:true,
          showLocInfo:false,
          errorMsg:error
        })
      
    }
      
    console.log('aaaaaaaa', this.state.weatherData)
    console.log('dddddddd', locResults.data)
    console.log('dddddddd', locResults.data[0])
    console.log('error', this.state.showError)
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
        {/* <p className = "description">Description: {this.state.weatherData[0].description}</p> */}
        <p className="longC">data day 1: {this.state.weatherData[0].data}</p>
        <p className="longC">description day 1: {this.state.weatherData[0].description}</p>
        <p className="longC">data day 2: {this.state.weatherData[1].data}</p>
        <p className="longC">description day 2: {this.state.weatherData[1].description}</p>
        <p className="longC">data day 3: {this.state.weatherData[2].data}</p>
        <p className="longC">description day 3: {this.state.weatherData[2].description}</p>
        </>
        }
        {this.state.showError &&
        <p>ERROR 404! Location NOT FOUND!!</p>
        }
        </div>
      </div>
    )
  }
}
export default App
