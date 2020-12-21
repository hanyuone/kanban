import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Board from './board';

class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        boards: [],
        tasks: []
      };
    }

    onDragEnd = result => {
      const { source, destination, draggableId } = result;

      if (!destination) return;
      // The user dragged the item back to its original place
      if (source.index === destination.index && source.droppableId === destination.droppableId) return;

      const boardIndex = this.state.boards.findIndex(board => board.id === parseInt(source.droppableId));
      const currentBoard = this.state.boards[boardIndex];
      const newOrder = Array.from(currentBoard.tasks);
      
      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, parseInt(draggableId));

      // Updates it locally so it seems smooth
      let newBoards = this.state.boards.slice();
      newBoards[boardIndex].tasks = newOrder;

      this.setState({
        boards: newBoards
      });

      // Creates requests to update serverside
      let requests = [];

      for (let i = 0; i < newOrder.length; i++) {
        const current = newOrder[i];
        const taskIndex = this.state.tasks.findIndex(task => task.id === current);
        const currentTask = this.state.tasks[taskIndex];
        currentTask.order = i;

        requests.push(axios.put(`/api/tasks/${current}/`, currentTask));
      }

      axios.all(requests).then(_ => this.refreshList());
    }

    refreshList = () => {
      const boardPromise = axios.get("/api/boards/");
      const taskPromise = axios.get("/api/tasks/");

      axios.all([boardPromise, taskPromise]).then(axios.spread((...responses) => {
        this.setState({
          boards: responses[0].data,
          tasks: responses[1].data
        })
      })).catch(err => console.log(err));
    };

    componentDidMount() {
      this.refreshList();
    }

    render() {
      return (
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.boards.map(board => {
            const tasks = board.tasks.map(taskId => this.state.tasks.find(task => task.id === taskId));
            return <Board key={board.id} board={board} tasks={tasks} />;
          })}
        </DragDropContext>
      );
    }
}

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

ReactDOM.render(<App />, document.getElementById('root'));
