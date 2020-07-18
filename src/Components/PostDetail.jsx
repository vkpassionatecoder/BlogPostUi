import React from 'react';
import loading from '../Styles/images/loading.gif'
import moment from 'moment';
import Api_Url  from '../Constants';

class PostDetail extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {
        postDetails:null,
        postLoaded:false
    }
    componentDidMount(){
       this.getInitialData();
    }

    getInitialData = ()=>{
      let path = this.props.location.pathname;
      let id = path.substring(path.lastIndexOf('/')+1, path.length);
      fetch(`${Api_Url}/getbyid/${id}`)
      .then(res => res.json())
      .then((res) => {
        console.log(res);
        this.setState({postDetails:res,postLoaded:true})
      });

    }
    render() {
        
        return (
            <div>{!this.state.postLoaded?<img src={loading} height="100px" width="100px"/>:
            <div className="container">
                        
            <div className="row">
                <div className="col-lg-12">
             <h1 class="mt-4" dangerouslySetInnerHTML={{ __html: this.state.postDetails.title }}/>
  
                          <p class="lead">
                          by
                          <a href= {this.state.postDetails.author.profile_URL}>{this.state.postDetails.author.name}</a>
                          </p>
  
                          <hr/>
                           <p>Posted on {moment(this.state.postDetails.date).format('DD-MMM-YYYY')}</p>
  
                          <hr/>
                          <img class="img-fluid rounded" src={this.state.postDetails.post_thumbnail?this.state.postDetails.post_thumbnail.URL:"http://placehold.it/900x300"} alt=""/>
  
                          <hr/>
                          <div id="blogContent" dangerouslySetInnerHTML={{ __html: this.state.postDetails.content }} />
                           
                          <hr/>
                     </div>
  
                </div>
            </div>
            }</div>
        
        )
    }
}

export default PostDetail