import { Box, Typography } from '@mui/material';
import Post from './Post';

const Posts = ( { setPosts, posts } ) => {
    return (
        <Box>
            {posts.map((post) => (
                <Post setPosts={setPosts} key={post.id} post={post} />
            ))}
            {posts.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography color="text.secondary"></Typography>
                </Box>
            )}
        </Box>
    );
}

export default Posts;
