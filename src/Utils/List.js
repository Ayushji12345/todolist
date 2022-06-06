import React from 'react'

import { FaEdit, FaTrash } from "react-icons/fa"

const List = ({ items, removeItem, editItem }) => {
 
  console.log('aaaaaaaaaaa', items)
  const mainList = items
  return (
    <div className='container'>
      {mainList.map((item) => {

        const { id, title } = item
        return (
          <ul className='list-group list-group-flush' key={id}>
            <li title={title} className='list-group-item d-flex justify-content-between aling-items-center'>
              <div className='f'>{title}</div>
              <div style={{ float: "right" }}>
                <button type='button' className='edit-btn' onClick={() => editItem(id)}>
                  <FaEdit title='Edit' />

                </button>
                <button type='button' className='delete-btn' onClick={() => removeItem(id)}>
                  <FaTrash title='Delete' />
                </button>
              </div>
            </li>

          </ul>
        )
      })}

    </div>
  )
}

export default List
