import  React, {useEffect , useState}  from 'react';
import Moment from 'react-moment';

import useFetch from '../../customHook/useFetch';
import PreviewUrl from '../previewUrl';
import './style.scss';

import { HACKER_NEWS_API } from '../../config';

const StoryItem = (props) => {
  const {
    item = 0,
    index = 0,
  } = props;

  const options = {
    by: "",
    descendants: 0,
    id: 0,
    kids: [],
    score: 0,
    time: 0,
    title: "",
    type: "",
    url: ""
  }

  const [itemOptions, setItemOptions] = useState(options);
  const [itemPreview, setItemPreview] = useState(false);
  const response = useFetch(`${HACKER_NEWS_API}/item/${item}.json`);

  useEffect(() => {
    if(!response) {
      return "";
    }
    setItemOptions(response);
  }, [response]);

  const createMarkup = (item) => {
    return {__html: item};
  }

  const getHostname = (url) => {
    if(url !== undefined && url !== null && url !== "") {
      return new URL(url).hostname;
    }
  }

  return (
    <>
      <tr className="story-title-wrapper">
        <td>
          <span>{(index + 1)}.</span>
        </td>
        <td></td>
        <td
          onMouseOver={() => setItemPreview(true)}
          onMouseOut={() => setItemPreview(false)}
        >
          <a
            href={itemOptions.url}
            dangerouslySetInnerHTML={createMarkup(itemOptions.title)}
            className="story-title"
          />
          {
            (itemOptions.url !== "") &&
            (
              <>
                &nbsp;
                (
                  <a href={ itemOptions.url } className="story-url">
                    <span>{getHostname(itemOptions.url)}</span>
                  </a>
                )
                <PreviewUrl 
                  itemPreview={itemPreview}
                  url={itemOptions.url}
                />
              </>
            )
          }
        </td>
      </tr>
      <tr className="story-extra-info">
        <td colSpan="2"></td>
        <td>
          {itemOptions.score} points by {itemOptions.by} &nbsp;
          <Moment fromNow interval={0} unix>{itemOptions.time}</Moment>&nbsp;|&nbsp;
          {itemOptions.kids?.length} comments
        </td>
      </tr>
      <tr className="separater"></tr>
    </>
  );

};

export default StoryItem;
