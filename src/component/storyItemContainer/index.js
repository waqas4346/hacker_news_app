import  React  from 'react';
import './style.scss';

const StoryItemContainer = (props) => {

  return (
    <div className="stories-table-wrapper">
      <table>
        <tbody>
          {props.children}
        </tbody>
      </table>
    </div>
  )
}

export default StoryItemContainer;
