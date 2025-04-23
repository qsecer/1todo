import React, {useRef, useState} from 'react';
import {formatDistanceToNow} from 'date-fns';


export default function Task ({ label,
                                completed,
                                onDeleted,
                                onEditing,
                                id,
                                isEditing,
                                onCompleted,
                                submitEdit,
                                offEdit,
                                min,
                                sec ,
                                createdAt,
                                runTimer,
                                remainingTime,
                                isTimerRunning,
                                stopTimer
}){

        const [ newLabel, setnewLabel ] = useState(label);
        const handleInputChange = (e) => {
          setnewLabel(e.target.value)
        }

        let liClass = "";
        if(completed){
            liClass += 'completed'
        }
        if(isEditing){
            liClass += 'editing'
        }
        return (
          <li className={liClass}>
              <div className="view">
                  <input className="toggle"
                         type="checkbox"
                         checked={completed}
                         onChange={() => onCompleted(id)}
                  />
                  <label>
                      <span className="title">{label}</span>
                      <span>
                                <button className="icon icon-play" onClick={() => {runTimer(id), console.log(isTimerRunning)}} />
                                <button className="icon icon-pause" onClick={() => {stopTimer(id), console.log(isTimerRunning)}} />
                                <span>{`${min} min ${sec} sec`}</span>
                            </span>
                      <span className="created">
                                {formatDistanceToNow(createdAt, {addSuffix: true})}
                        </span>
                  </label>
                  <button className="icon icon-edit" onClick={() => onEditing(id)} />
                  <button className="icon icon-destroy" onClick={() => onDeleted(id)}/>
              </div>
              {isEditing && (
                <form
                  onSubmit={()=> submitEdit(e, id)}
                  className='editing-form'
                >
                    <input
                      type="text"
                      className="edit"
                      value={newLabel}
                      onChange={handleInputChange}
                      autoFocus
                      onKeyDown={(e) => {
                          if(e.key === 'Enter'){
                              submitEdit(e, id);
                          }else if (e.key === 'Escape'){
                              offEdit(id);
                          }
                      }}
                    />
                </form>
              )}
          </li>
        );
}