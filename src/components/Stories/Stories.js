import React, { useState, useRef } from 'react';
import classNames from "classnames/bind";
import styles from "./Stories.module.scss";
import { Typography, Box, IconButton } from '@mui/material';
import { Add as AddIcon, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useDrag } from '@use-gesture/react';
import Story from './Story';
import CreateStory from './CreateStory';

const cx = classNames.bind(styles);

const Stories = () => {
    const ref = useRef(null);
    const [openCreateStory, setOpenCreateStory] = useState(false);
    const [showNavButtons, setShowNavButtons] = useState(false);
    const [stories] = useState([
        {
            id: 1,
            user: {
                name: 'Kim Chi',
                avatar: 'https://i.pravatar.cc/150?img=1'
            },
            imageUrl: 'https://picsum.photos/seed/1/400/600'
        },
        {
            id: 2, 
            user: {
                name: 'Hà Thu',
                avatar: 'https://i.pravatar.cc/150?img=2'
            },
            imageUrl: 'https://picsum.photos/seed/2/400/600'
        },
        {
            id: 3,
            user: {
                name: 'Dương Thị Hường Trà',
                avatar: 'https://i.pravatar.cc/150?img=3'
            },
            imageUrl: 'https://picsum.photos/seed/3/400/600'
        },
        {
            id: 4,
            user: {
                name: 'Nguyễn Minh Phương', 
                avatar: 'https://i.pravatar.cc/150?img=4'
            },
            imageUrl: 'https://picsum.photos/seed/4/400/600'
        },
        {
            id: 5,
            user: {
                name: 'Phạm Hoàng Anh',
                avatar: 'https://i.pravatar.cc/150?img=5'
            },
            imageUrl: 'https://picsum.photos/seed/5/400/600'
        },
        {
            id: 6,
            user: {
                name: 'Trần Thanh Tùng',
                avatar: 'https://i.pravatar.cc/150?img=6'
            },
            imageUrl: 'https://picsum.photos/seed/6/400/600'
        },
        {
            id: 7,
            user: {
                name: 'Lê Thị Mai',
                avatar: 'https://i.pravatar.cc/150?img=7'
            },
            imageUrl: 'https://picsum.photos/seed/7/400/600'
        },
        {
            id: 8,
            user: {
                name: 'Nguyễn Văn An',
                avatar: 'https://i.pravatar.cc/150?img=8'
            },
            imageUrl: 'https://picsum.photos/seed/8/400/600'
        },
        {
            id: 9,
            user: {
                name: 'Hoàng Thị Ngọc',
                avatar: 'https://i.pravatar.cc/150?img=9'
            },
            imageUrl: 'https://picsum.photos/seed/9/400/600'
        },
        {
            id: 10,
            user: {
                name: 'Đặng Văn Minh',
                avatar: 'https://i.pravatar.cc/150?img=10'
            },
            imageUrl: 'https://picsum.photos/seed/10/400/600'
        }
    ]);
    const handleOpenCreateStory = () => {
        setOpenCreateStory(true);
    };
    const bind = useDrag(({ movement: [x], direction: [xDir], down }) => {
        if (ref.current) {
            ref.current.scrollLeft = ref.current.scrollLeft - (x * 1.5);
        }
    });

    const handleScroll = (direction) => {
        if (ref.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <Box 
            position="relative" 
            onMouseEnter={() => setShowNavButtons(true)}
            onMouseLeave={() => setShowNavButtons(false)}
        >
            <Box 
                ref={ref}
                className={cx('stories-container')}
                {...bind()}
                sx={{
                    overscrollBehaviorX: 'contain',
                    scrollSnapType: 'x mandatory',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                    cursor: 'grab',
                    '&:active': {
                        cursor: 'grabbing'
                    }
                }}
            >
                {/* Nút tạo story mới */}
                <Box className={cx('story-item', 'create-story')} onClick={handleOpenCreateStory}> 
                    <Box className={cx('story-card')}>
                        <Box className={cx('create-story-placeholder')}>
                            <AddIcon className={cx('add-icon')} />
                        </Box>
                        <Box className={cx('story-footer')}>
                            <Typography sx={{ color: '#1877f2' }} className={cx('story-text')}>
                                Tạo tin
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <CreateStory open={openCreateStory} onClose={() => setOpenCreateStory(false)} />

                {/* Danh sách stories */}
                {stories.map(story => (
                    <Story key={story.id} story={story} />
                ))}
            </Box>

            {showNavButtons && (
                <>
                    <IconButton
                        onClick={() => handleScroll('left')}
                        sx={{
                            position: 'absolute',
                            left: 10,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: 'white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            '&:hover': { bgcolor: 'white' }
                        }}
                    >
                        <ChevronLeft />
                    </IconButton>
                    <IconButton
                        onClick={() => handleScroll('right')}
                        sx={{
                            position: 'absolute',
                            right: 10,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: 'white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            '&:hover': { bgcolor: 'white' }
                        }}
                    >
                        <ChevronRight />
                    </IconButton>
                </>
            )}
        </Box>
    );
};

export default Stories;