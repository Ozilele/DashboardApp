import React, { useState } from 'react'
import './Kanban.css';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '../../../utils/StrictModeDroppable';
import DraggableColumn from '../../../components/kanban/DraggableColumn';
import AddIcon from '@mui/icons-material/Add';
import TaskItem from '../../../components/kanban/TaskItem';
import TextareaAutosize from 'react-textarea-autosize';
import { v4 as uuidv4 } from 'uuid';
import { pickRandomColor } from '../../../utils/helpers';

const DUMMY_TASKS = [
  {
    id: uuidv4(),
    column: "To Do",
    name: "Wyprowadzenie psa",
    bgColor: "blue"
  },
  {
    id: uuidv4(),
    column: 'In Progress',
    name: "Wyrzucenie śmieci",
    bgColor: "teal",
  },
  {
    id: uuidv4(),
    column: "To Do",
    name: "Odebranie faktury",
    bgColor: "green"
  },
  {
    id: uuidv4(),
    column: "Blocked",
    name: "Rozliczenie podatków",
    bgColor: "orange",
  },
  {
    id: uuidv4(),
    column: "Done",
    name: "Spotkanie z managerem",
    bgColor: "purple"
  },
  {
    id: uuidv4(),
    column: "In Progress",
    name: "Przygotowanie obiadu",
    bgColor: "yellow"
  },
]

const dummy_columns = {
  [uuidv4()]: {
    name: "To Do",
    tasks: DUMMY_TASKS.filter(task => task.column == "To Do"),
    columnId: 't_1'
  },
  [uuidv4()]: {
    name: "In Progress",
    tasks: DUMMY_TASKS.filter(task => task.column == "In Progress"),
    columnId: 't_2'
  },
  [uuidv4()]: {
    name: "Blocked",
    tasks: DUMMY_TASKS.filter(task => task.column == "Blocked"),
    columnId: 't_3'
  },
  [uuidv4()]: {
    name: "Done",
    tasks: DUMMY_TASKS.filter(task => task.column == "Done"),
    columnId: 't_4'
  },
}


const Kanban = () => {

  const [columns, setColumns] = useState(dummy_columns);

  const handleOnDragEnd = (result) => {
    if(!result.destination) {
      return;
    }
    const { source, destination } = result;

    if(source.droppableId !== destination.droppableId) { // dragging between columns
      const srcColumn = columns[source.droppableId]
      const destColumn = columns[destination.droppableId];
      const srcTasks = [...srcColumn.tasks];
      const destTasks = [...destColumn.tasks];
      const [removed] = srcTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...srcColumn,
          tasks: srcTasks
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destTasks,
        }
      })
    } 
    else {
      const column = columns[source.droppableId];
      const columnTasks = [...column.tasks];
      const [reorderedItem] = columnTasks.splice(source.index, 1); // removing task from src index
      columnTasks.splice(destination.index, 0, reorderedItem); // inserting at dest index
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: columnTasks,
        }
      });
    }
  }

  const addNewTask = (e) => {
    let colID;
    const [col] = Object.entries(columns).filter(([id, col]) => {
      if(col.name == e.target.name) {
        return {
          ID: id,
          data: col,
        }
      }
    });
    colID = col[0];
    const column_ref = columns[colID];
    const colTasks = [...col[1].tasks];
    colTasks.unshift({
      id: uuidv4(),
      column: col[1].name,
      name: `New ${col[1].name} task`,
      columnId: col[1].columnId,
    });
    setColumns({
      ...columns,
      [colID]: {
        ...column_ref,
        tasks: colTasks,
      }
    });
  }

  return (
    <div className="kanban">
       <div className="kanban__header">
         <h2>Kanban App</h2>
       </div>
      <div className="kanban__section">
      <DragDropContext onDragEnd={result => handleOnDragEnd(result)}>
      {Object.entries(columns).map(([id, column]) => {
             return (
              <Droppable droppableId={id} key={id}>
                {(provided, snapshot) => {
                  return (
                    <div 
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="kanban__column"
                    >
                      <h3>{column.name}</h3>
                      <button name={column.name} onClick={addNewTask} className="add-task-btn">
                        <AddIcon className="add-task-icon"></AddIcon>
                      </button>
                        {column.tasks.map((task, index) => {
                          return (
                          <Draggable key={task.id} draggableId={task.id.toString()} index={index} >           
                            {(provided, snapshot) => {
                              return (
                                <TaskItem columns={columns} setColumns={setColumns} columnName={column.name} key={task.id} id={task.id} reference={provided.innerRef} dragProps={provided.draggableProps} dragHandle={provided.dragHandleProps} task={task.name}>
                                </TaskItem>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}  
                    </div>
                  )
                }}
              </Droppable>
             )
          })}
        </DragDropContext>
      </div>
    </div>
  )
}

export default Kanban;



