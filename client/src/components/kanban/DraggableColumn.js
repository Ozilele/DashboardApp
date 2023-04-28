import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';
import { pickRandomColor } from '../../utils/helpers';
import './KanbanColumn.css'


const DraggableColumn = ({ columnId, tasks, name }) => {

  const [columnTasks, setColumnTasks] = useState(tasks);

  // const addNewTask = (e) => {
  //   const taskData = {
  //     id: `${columnId}_${columnTasks.length + 1}`,
  //     name: `New ${name} task`,
  //     bgColor: pickRandomColor(),
  //   }
  //   setColumnTasks((prev) => {
  //     return ([
  //       taskData,
  //       ...prev
  //     ]);
  //   });
  // }

  // return (

  // )
}

export default DraggableColumn