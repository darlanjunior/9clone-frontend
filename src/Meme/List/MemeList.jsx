import React from 'react'

import Meme from './Meme'
import ajax from '../../Shared/ajax';

const responseToComponent = ({attributes: {url, title}}) => <Meme key={url} {...{url, title}} />

const MemeList = props => {
  const memes = props.response.data;

  return <div>
    {memes.map(responseToComponent)}
  </div>
}

export default ajax({
  url: '/memes',
  loadingComponent: <div>oie</div>
})(MemeList)
