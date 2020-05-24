import React,{Component} from 'react';
class Posts extends Component {
  constructor(props) {
    super(props);
    this.state={
        data:this.props.data
    }
}


render() {
          let posts = [{"topic":"topicc","description":"description","details":"deetails"},
          {"topic":"topicc","description":"description","details":"deetails"},
          {"topic":"topicc","description":"description","details":"deetails"},
          {"topic":"topicc","description":"description","details":"deetails"},
          {"topic":"topicc","description":"description","details":"deetails"},
          {"topic":"topicc","description":"description","details":"deetails"},
          {"topic":"topicc","description":"description","details":"deetails"},
          {"topic":"topicc","description":"description","details":"deetails"},
          {"topic":"topicc","description":"description","details":"deetails"},
          {"topic":"topicc","description":"description","details":"deetails"},
        ];
        return (
            <div>
            {posts.map(function(data, index){
                return <Post key={index} data={data}/>
              })}
            
            </div>
            );  
  }  
} 
function Post(props){
  return (<div>
              <Topic data={props.data.topic}/>
              <Description data={props.data.description}/>
              <Details data={props.data.details}/>
              <hr/>
          </div>);
}
function Topic(props){
  return(<p>{props.data}</p>);
}
function Description(props){
  return(<p>{props.data}</p>);
}
function Details(props){
  return(<p>{props.data}</p>);
} 
export default Posts;