import React from 'react';
import Post from './Post';
import '../Styles/PostList.scss';

export default function PostList ({posts,columns,isLoading}) {
debugger;
    return (
        <div>
        {!posts? null :   
        <section className ='masonry' style ={{gridTemplateColumns: `repeat(${columns},minmax(275px,3fr))`}}>
            {posts.map((post,index)=>
             <Post {...{post,index,key:index}}/>
            )}
        </section>}
        </div>

    )
}