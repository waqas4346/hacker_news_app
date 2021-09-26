import  React, {useEffect , useState}  from 'react';
import { getLinkPreview } from "link-preview-js";
import './style.scss';

const PreviewUrl = (props) => {

  const {
    itemPreview = false,
    url = ""
  } = props;

  const [responseUrl, setResponseUrl] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUrlInfo = async () => {
      if(url !== undefined && url !== null && url !== "") {
        try {
          const respHtml = await getLinkPreview(url.trim(), {
            imagesPropertyType: "og"
          });

          setResponseUrl(respHtml);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setError(true);
        }
      }
    }
    return fetchUrlInfo();
  }, [url]);

  const {
    images = [],
    title = "",
    description = ""
  } = responseUrl;

  if(itemPreview === false || error) {
    return false;
  }
  
  let invalid = false;
  if( (title === "" || title === undefined) && (description === "" || description === undefined)) {
    invalid = true;
  }

  return (
    <div className="preview_url_wrapper">
      <div className="preview_url">
        {
          (!error && !isLoading && !invalid) &&
          (
            <>
            {
              (images[0] !== "") && (images[0] !== undefined) && (images.length !== 0) &&
              <div className="img-wrapper">
                <img alt="" className="img" src={images[0]} />
              </div>
            }
              <div className="content-wrapper">
                <h4> {title === "" ? "Not Found" : `${title.substring(0, 50)}...`}</h4>
                <p> { description === undefined || description === "" ? "Not Found" : `${description.substring(0, 150)}...` } </p>
              </div>
            </>
          )
        }
      </div>
    </div>
  );
};

export default  PreviewUrl;
