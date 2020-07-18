import React from 'react';
import '../Styles/Post.scss';
import {categoryColors} from './styles';
import { Link } from 'react-router-dom'
export default function Post ({post}){
debugger;
    const imgUrl = post.post_thumbnail?post.post_thumbnail.URL:"http://placehold.it";
    const style = {backgroundImage:`url("${imgUrl}")`,border:'1px solid'};
    const date = Math.round((new Date() - new Date(post.date)) / (1000 * 60 * 60 * 24));
    const categories = Object.keys(post.categories);
    return (

     <Link className="masonry-post overlay" style={style}  to={{pathname: `/postdetail/${post.ID}`}} >
              <div className="image-text">
                  {!post.post_thumbnail?<h4>No Image Provided</h4>:null} 
               <div className="tags-container">
               {categories.map((category,ind) =><span key={ind}  className="tag" style={{backgroundColor:categoryColors[category]}}> 
                 {`${category} `}
               </span>)}
           </div>
           <div className="date-div" >
            <span className="image-date">{`${date} days ago`} </span>
           </div>
       </div>
     
        </Link>
        
    )
}