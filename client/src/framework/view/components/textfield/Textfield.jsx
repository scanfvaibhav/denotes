import { Component } from "react";
import {InputText} from 'primereact/inputtext';
import './Textfield.css';


class Textfield extends Component{

render(){
    return (<InputText value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />);
}


}
export default Textfield;