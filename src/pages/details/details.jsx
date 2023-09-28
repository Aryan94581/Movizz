import React from 'react';
import "./details.scss";
import useFetch from '../../components/hooks/useFetch';
import { useParams } from 'react-router-dom';
import DetailsBanner from './detailsBanner/DetailsBanner';

const details = () => {
  // const {mediaType,id} = useParams();
  // const {data , loading} = useFetch(`/${mediaType}/${id}`)
  return (
    <div>
      <DetailsBanner/>
    </div>
  )
}

export default details