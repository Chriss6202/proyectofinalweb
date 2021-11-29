import Entry from './Entry/Entry'

const Post = ({ posts=[]}) => {
    return (
        <div>
            {
                posts.map( post => {
                    return <Entry
                    key ={post.id}
                    post={post}
                    />
                } )
            }
        </div>
    )
}

export default Post;