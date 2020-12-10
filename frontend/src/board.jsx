import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import './index.css';
import Task from './task';

export default class Board extends React.Component {
  render() {
    return (
      <div className="container">
        <h3 className="title">{this.props.board.title}</h3>
        <Droppable droppableId={this.props.board.id.toString()}>
          {provided => (
            <div className="task_list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.props.tasks.map((task, index) => {
                return <Task key={task.id} task={task} index={index} />;
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
