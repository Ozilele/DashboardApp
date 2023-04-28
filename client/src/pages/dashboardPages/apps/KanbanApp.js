import React from 'react'
import Kanban from './Kanban';

const KanbanApp = () => {
  return (
    <div className="kanban">
      <div className="kanban__header">
        <h2>Kanban App</h2>
      </div>
      <Kanban/>
    </div>
  )
}

export default KanbanApp;