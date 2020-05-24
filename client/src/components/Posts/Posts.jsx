import React,{Component} from 'react';
class Posts extends Component {
    constructor(props) {
      super(props);
    }
     
    render() {
      return (
          <div > 
            <a href="#" >
              <h4 >List group item heading</h4>
              <p >Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            </a>
            <a href="#" >
              <h4 >List group item heading</h4>
              <p >Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            </a> 
            <a href="#" >
              <h4 >List group item heading</h4>
              <p >Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            </a> 
          </div>
      )
    }
}
export default Posts;