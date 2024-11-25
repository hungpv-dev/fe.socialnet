import React, { useState, useRef, useEffect } from 'react';
import classNames from "classnames/bind";
import styles from "./Stories.module.scss";
import { Typography, Box, IconButton } from '@mui/material';
import { Add as AddIcon, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useDrag } from '@use-gesture/react';
import Story from './Story';
import CreateStory from './CreateStory';
import axiosInstance from '@/axios';
import StoryViewer from './StoryViewer';

const cx = classNames.bind(styles);

const Stories = () => {
    const ref = useRef(null);
    const [openCreateStory, setOpenCreateStory] = useState(false);
    const [showNavButtons, setShowNavButtons] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);

    const [stories, setStories] = useState([]);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axiosInstance.get('story');
                setStories(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        
        fetchStories();
    }, []);


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

                <CreateStory 
                    open={openCreateStory}
                    setStories={setStories}
                    stories={stories}
                    onClose={() => setOpenCreateStory(false)}    
                />

                {/* Danh sách stories */}
                {stories.map((story, index) => (
                    <Story 
                        key={story.id} 
                        story={story} 
                        onClick={() => setSelectedStory(index)}
                    />
                ))}

                <StoryViewer 
                    open={selectedStory !== null}
                    onClose={() => setSelectedStory(null)}
                    stories={stories}
                    setStories={setStories}
                    initialStoryIndex={selectedStory}
                />
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