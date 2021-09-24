import React  from "react"; 
import axios from 'axios';
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherInfo from "./component/WeatherInfo";
import MovieInfo from "./component/MovieInfo";



 class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locationResult: {},
      weatherData: {},
      searchQuery: '',
      showLocInfo: false,
      showError: false,
      errorMsg: '',
      showWeatherData: false
    };
  }

  getLocFun = async (event) => {
      event.preventDefault();

      await this.setState({
        searchQuery: event.target.city.value 
      })

      let reqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.searchQuery}&format=json`


      let locResults = await axios.get(reqUrl);

      try {
      this.setState({
        locationResult: locResults.data[0],
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
      this.getweatherData();
      this.getMovieData();

    console.log('aaaaaaaa', this.state.weatherData)
    console.log('dddddddd', locResults.data)
    console.log('dddddddd', locResults.data[0])
    console.log('error', this.state.showError)
    } 


    getweatherData = async () => {
      
      let weatherUrl = `${process.env.REACT_APP_SERVER_LINK}/weather?city=${this.state.searchQuery}`

      let weatherResults = await axios.get(weatherUrl);

      this.setState({
        showWeatherData:true,
        weatherData: weatherResults.data,
      })
      console.log(this.state.weatherData,"data")
    }


    getMovieData = async () => {
      let movieURL = `${process.env.REACT_APP_SERVER_LINK}/movie?query=${this.state.searchQuery}`
      console.log('movie url',movieURL)
      let movieDataResults = await axios.get(movieURL);
      console.log('movie rueslts',movieDataResults)
      this.setState({
        showMovieData:true,
        movieData: movieDataResults.data
      });
      console.log('movie data',this.state.movieData)
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
        {this.state.showWeatherData &&
        <>
        {this.state.weatherData.map((value, index) => {
          return(
            <WeatherInfo key={index} city={this.state.searchQuery} description={value.description} date={value.date} />
          )
        })
        }
        </>
        }

        {this.state.showMovieData &&
        <>
        {this.state.movieData.map((value,index) => {
          return (
            <>
            <MovieInfo key={index} city={this.state.searchQuery} title={value.title} overview={value.overveiw} avgVotes={value.avgVotes} totalVotes={value.totalVotes} imgURL={value.imgURL} popularity={value.popularity} released={value.released}/>
            </>
          )
        })}
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
