import React from 'react'
import { Link , useParams  } from 'react-router-dom';
export default function Courses() {

  let { id } = useParams();
  return (
    <div>
       {id}
    </div>
  )
}
