import React, { Component } from 'react';
import axios from 'axios';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      description: ''
    }
  }

  handleClickGetComment = (e) => {
    const { description } = this.state;
    const links = description.split('\n')	
    axios.post(`/api/comment/getcom`,{ data: links })
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch((error) => {
        console.log('err',error)	  
      });
  }

  handleClickSave = (e) => {
    const { posts } = this.state;
    axios.post(`/api/comment`,posts)
      .then((res) =>{
        console.log('save',res)
        }
      )
      .catch(err =>{
        console.log('err',err)
      });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  render() {
    const { description, posts } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Comment List &nbsp;
            </h3>
          </div>
          <div class="panel-body">
            <button 
              class="btn btn-default"
              onClick={this.handleClickGetComment}>Get comments</button>
            <button 
              class="btn btn-default"
              onClick={this.handleClickSave}>Save to db</button>
            <div>
              <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
            </div> 
            <div className="bodyComments">
            {posts.map((coment, index) => (
                <div key={index}>
                  { coment.map((comentObj, index2) => (
                    <ul key={index2}>
                    <li>
                      <div>
                        product
                      </div>
                      <div>
                        {comentObj.product}
                      </div>
                    </li>
                    <li>
                      <div>
                        author
                      </div>
                      <div>
                        {comentObj.author}
                      </div>
                    </li>
                    <li>
                      <div>
                        comment
                      </div>
                      <div>
                        {comentObj.comment}
                      </div>
                    </li>
                    </ul>
                  ))} 
                </div>
              ))}
            </div> 
          </div>
        </div>
      </div>
    );
  }
}

export default App;
