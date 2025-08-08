import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container, Postcard } from "../components/index"


const Home = () => {

    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {

        const fetchedpost = await appwriteService.getPosts()
        console.log("fetched post", fetchedpost);
        
        if (fetchedpost) {
            setPosts(fetchedpost.documents)

        }
        console.log("displayed post",posts);
        
    }
    useEffect(() => {

        fetchPosts()
    }, [])




if (posts.length === 0) {
    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )

}
return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Postcard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
)
}

export default Home