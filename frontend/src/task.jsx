import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './index.css';

export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id.toString()} index={this.props.index}>
        {provided => (
          <div className="container"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {this.props.task.title}
          </div>
        )}
      </Draggable>
    );
  }
}
