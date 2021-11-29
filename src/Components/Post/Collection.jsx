import Entry from './Entry/Entry'

const Collection = ({ Posts = [] }) => {
    return (
        <div>
            {
                Posts.map( post => {
                    return <Entry
                    key ={post.id}
                    post={post}
                    />
                } )                  
            }
        </div>
    )
}

export default Collection;