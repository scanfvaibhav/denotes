import React,{Component} from 'react';
import StarRatings from 'react-star-ratings';
import Login from '../Login/Login';

class Profile extends Component {  
    constructor(props) {
        super(props);
        this.state={data:props.data};
    }

    
  render() {
    return (
        <div>
        <Login/>
        {this.state.data?
        <div>
        <img src={this.state.data.picture.data.url}/>
            <div >{this.state.data.name}</div>
            <div > {this.state.data.email}</div>
            <div > <StarRatings
                    rating={5}
                    starRatedColor="hsl(51, 71%, 61%)"
                    starDimension="20px"
                    starSpacing="3px"
                /> 
            </div>
            </div>:""}
            </div>
        );  
    }  
} 

export default Profile;