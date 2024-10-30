import { getAllPosts } from '@/api/api';
import CardOffer from '@/components/CardOffer';
import { ScrollArea } from '@/components/scroll-area'
import { useQuery } from '@tanstack/react-query';


const MainPage = () => {
    const {
        data: posts,
        isLoading,
        error,
      } = useQuery({
        queryKey: ["posts"],
        queryFn: getAllPosts,
      });
  return (
   <section className="h-full w-full rounded-md shadow-md dark:shadow-zinc-800">
   <ScrollArea className="h-full w-full p-3">

   
        {isLoading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p>Error loading posts: {error.message}</p>
        ) : (
          <div className="h-10 w-full flex-col">
            {posts?.map((post) => <CardOffer key={post.id} post={post} />)}
          </div>
        )}
    
        </ScrollArea>

  </section>

  )
}

export default MainPage