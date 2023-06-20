import React from 'react';
import { useParams } from 'react-router-dom';

export default function Semester() {

    let { id } = useParams();
  return (
    <div> {id} </div>
  )
}
