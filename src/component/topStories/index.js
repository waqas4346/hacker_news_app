import  React , {useEffect, useState} from 'react';

import useFetch from '../../customHook/useFetch';
import StoryItemContainer from '../storyItemContainer';
import StoryItem from '../storyItem';

import { HACKER_NEWS_API } from '../../config';

const TopStories = () => {

  const [topStories, setTopStories] = useState([]);
  const top_stories_ids = useFetch(`${HACKER_NEWS_API}/topstories.json`);

  
  useEffect(() => {
    if (!top_stories_ids) {
      return "";
    }

    setTopStories(top_stories_ids);
  }, [top_stories_ids]);

  return (
    <div className="container">
      <StoryItemContainer>
        {
          topStories.map((item, index) => {
            return (
              <StoryItem 
                item={item}
                index={index}
                key={index}
              />
            );
          })
        }
      </StoryItemContainer>
    </div>
  );
};

export default TopStories;
