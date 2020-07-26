import React from 'react';
import './Styles/App.css';
import loading from './Styles/images/loading.gif'
import PostList from './Components/PostList.jsx'
import Api_Url  from './Constants';
class App extends React.Component {

  state = {
     trending:null,
     topTenTags: null,
     offset:0,
     isLoading:true
  }

  componentDidMount() {
    this.getInitialData();
  }

  getInitialData = ()=>{
    fetch(`${Api_Url}/posts?offset=${this.state.offset}`)
    .then(res => res.json())
    .then((res) => {
      console.log(res);
      res.posts.sort((a,b) => a.date - b.date);
      this.setState({trending:res,isLoading:false})
    });

    fetch(`${Api_Url}/alltags`)
    .then(res => res.json())
    .then((res) => {
      console.log("tags",res);
      this.setState({topTenTags:res})
    });
  }

  getPostsByTag = (tagName)=>{
    this.setState({isLoading:true})
    debugger;
   //e.preventDefault();
    fetch(`${Api_Url}/bytag?tag=${tagName}`)
    .then(res => res.json())
    .then((res) => {
      console.log("tagsPosy",res);
      this.setState({trending:res,isLoading:false})
    });
  }

  getOlderPosts = ()=>{
    this.setState({isLoading:true});
    debugger;
     let offsetNew = this.state.offset+ 25;
     this.setState({offset: offsetNew});
     fetch(`${Api_Url}/posts?offset=${offsetNew}`)
     .then(res => res.json())
     .then((res) => {
       console.log(res);
       res.posts.sort((a,b) => a.date - b.date);
       this.setState({trending:res,isLoading:false})
     });
  }

  getPreviousPosts = ()=>{
    this.setState({isLoading:true});
    debugger;
     let offsetNew = this.state.offset - 25>=0 ? this.state.offset - 25:0;
     this.setState({offset: offsetNew});
     fetch(`${Api_Url}/posts?offset=${offsetNew}`)
     .then(res => res.json())
     .then((res) => {
       console.log(res);
       res.posts.sort((a,b) => a.date - b.date);
       this.setState({trending:res,isLoading:false})
     });
  }
  render() { 
    return(
      <div>
  <div className="container">
    <div className="row mt-3 mb-3 col-md-12 ">
      <div>
      <h2>Trending Posts</h2>
      </div>
      <div className="offset-md-5">
      <button  style={{backgroundColor:'#092b51d1',cursor:'pointer'}} onClick={this.getPreviousPosts} className="btn btn-primary">Previous Page</button>
       <button style={{backgroundColor:'#092b51d1',cursor:'pointer'}} onClick={this.getOlderPosts} className="btn btn-primary ml-2">Older Posts</button>
        </div>
    </div>
        {this.state.isLoading?<img src={loading} height="100px" width="100px"/>:
           <div className="row">
             <div className="col-sm-10">
             <PostList posts={this.state.trending?this.state.trending.posts:null} columns={3}/>
              </div>  
         <div className="col-sm-2">
          <div className="card my-4" style={{width:'18rem'}}>
            <h5 className="card-header">Tags</h5>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <ul className="list-unstyled mb-0">
                    {this.state.topTenTags?this.state.topTenTags.tags.map((tag)=>{
                        return (<li key={tag.ID}>
                          <br/>
                      <span  onClick={()=>this.getPostsByTag(tag.slug)} className="tagBtn"><i className="fa fa-tag"><span> {tag.name}</span></i></span>
                       </li>)
                    }): null}
                  </ul>
                </div>

              </div>
            </div>       
          
          </div>
  
        </div>
    
    
           </div>
    
        }
        
  </div>
  <footer className="py-5  mt-2 bg-dark">
  <div className="container">
    <p className="m-0 text-center text-white">Copyright @ Vk</p>
  </div>
</footer>
      </div>
  
  );
}
}

export default App;
