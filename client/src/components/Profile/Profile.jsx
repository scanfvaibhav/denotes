import React from 'react';
import StarRatings from 'react-star-ratings';
class Profile extends BaseComponent {  
    constructor(props) {
        super(props);
        this.state={data:props.data};
    }

    
  render() {
    return (
        <div ><img src={this.state.data.picture.data.url}/></div>
            <div >{this.state.data.name}</div>
            <div > {this.state.data.email}</div>
            <div > <StarRatings
                    rating={5}
                    starRatedColor="hsl(51, 71%, 61%)"
                    starDimension="20px"
                    starSpacing="3px"
                /> 
            </div>
        );  
    }  
} 

export default Profile;