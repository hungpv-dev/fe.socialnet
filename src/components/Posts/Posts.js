import { Box, Typography } from '@mui/material';
import Post from './Post';

const Posts = ( { posts } ) => {
    return (
        <Box>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
            {posts.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography color="text.secondary">Chưa có bài viết nào</Typography>
                </Box>
            )}
        </Box>
    );
}

export default Posts;
