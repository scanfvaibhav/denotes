import React,{Component} from 'react';
import { Dropdown,InputText } from 'primereact/dropdown';
import 'primeflex/primeflex.css';

class User extends Component{
    constructor(props){
        super(props);
        this.state={
            "country":[{
                "label":"India",
                "value":"india",
                "states":[{
                    "label":"UP",
                    "value":"UP",
                    "city":[{
                        "label":"Lucknow",
                        "value":"Lucknow"
                    },{
                        "label":"Kanpur",
                        "value":"Kanpur"
                    },{
                        "label":"Hardoi",
                        "value":"Hardoi"
                    }]
                },{
                    "label":"Karnataka",
                    "value":"Karnataka",
                    "city":[{
                        "label":"Banglore",
                        "value":"Banglore"
                    },{
                        "label":"Mysore",
                        "value":"Mysore"
                    }]
                }]
            },{
                "label":"pakistan",
                "value":"pakistan",
                "states":[{
                    "label":"Punjab",
                    "value":"Punjab",
                    "city":[{
                        "label":"Lahore",
                        "value":"Lahore"
                    },{
                        "label":"Multan",
                        "value":"Multan"
                    }]
                },{
                    "label":"Sindh",
                    "value":"Sindh",
                    "city":[{
                        "name":"Ralwalpindi",
                        "value":"Ralwalpindi"
                    }]
                }]
            }],
            "state":[],
            "city":[],
            "UP":[{
                "label":"Lucknow",
                "value":"Lucknow"
            },{
                "label":"Kanpur",
                "value":"Kanpur"
            },{
                "label":"Hardoi",
                "value":"Hardoi"
            }],
            "india":[{
                "label":"UP",
                "value":"UP",
                "city":[{
                    "label":"Lucknow",
                    "value":"Lucknow"
                },{
                    "label":"Kanpur",
                    "value":"Kanpur"
                },{
                    "label":"Hardoi",
                    "value":"Hardoi"
                }]
            },{
                "label":"Karnataka",
                "value":"Karnataka",
                "city":[{
                    "label":"Banglore",
                    "value":"Banglore"
                },{
                    "label":"Mysore",
                    "value":"Mysore"
                }]
            }]
        }
    }
    render(){
        return(
            <div className="p-fluid p-formgrid p-grid">
    <div className="p-field p-col">
        <Dropdown 
            value={this.state.country_value} 
            options={this.state.country} 
            onChange={(e) => {
                    this.setState({country_value: e.value});
                    this.setState({state_value: ""});
                    this.setState({city_value: ""});
                    this.setState({state:this.state[e.value]});
                }}
            placeholder="Select a Country"/>
        <Dropdown 
            value={this.state.city_value} 
            options={this.state[this.state.state_value]} 
            onChange={(e) => {
                    this.setState({city_value: e.value});
                   
                }}
            placeholder="Select a City"/>
    </div>
    <div className="p-field p-col">
        <Dropdown 
            value={this.state.state_value}
            options={this.state.state}
            onChange={(e) => {
                this.setState({state_value: e.value});
                this.setState({city_value: ""});
                this.setState({city:this.state[e.value]});
                }}
            placeholder="Select a State"/>
    </div>
</div>);
    }
}
export default User;