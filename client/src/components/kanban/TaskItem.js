import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TextareaAutosize from 'react-textarea-autosize';
import './TaskItem.css'

const TaskItem = ({ columns, setColumns, columnName, id, reference, dragProps, dragHandle, task, bgColor }) => {


  const handleChangeTextArea = (event) => { 
    const [col] = Object.entries(columns).filter(([id, col]) => {
      if(col.name == columnName) {
        return {
          ID: id,
          data: col,
        }
      }
    });
    const colID = col[0];
    const column = columns[colID];
    const taskToUpdate =  column.tasks.find((task) => {
      return task.id === id;
    });
    const taskToUpdateIndex = column.tasks.findIndex((task) => {
      return task.id === id;
    });
    const updatedTask = Object.create(taskToUpdate);
    updatedTask.name = event.target.value;

    column.tasks.splice(taskToUpdateIndex, 1, updatedTask);
    setColumns({
      ...columns,
      [colID]: {
        ...column,
        tasks: column.tasks,
      }
    });
  }

  return (  
    <div 
      ref={reference}
      {...dragProps}
      {...dragHandle}
      className="task-item" 
    >
    <IconButton className="delete-task-btn">
      <DeleteIcon className="delete-task-icon"/>
    </IconButton>
    <TextareaAutosize onChange={handleChangeTextArea} className="task-input" value={task}>
    </TextareaAutosize>
  </div>
  )
}

export default TaskItem