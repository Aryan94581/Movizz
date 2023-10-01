import React from 'react';
import "./details.scss";
import useFetch from '../../components/hooks/useFetch';
import { useParams } from 'react-router-dom';
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './cast/Cast';
import { createAction } from '@reduxjs/toolkit';
import VideosSection from './videoSection/VideoSection';
import Similar from './Recommendations';
import Recommendation from './similar';
const details = () => {
  const {mediaType,id} = useParams();
  const {data , loading} = useFetch(`/${mediaType}/${id}/videos`)
  const {data: credits , loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)
  return (
    <div>
      <DetailsBanner video={data?.results[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default details