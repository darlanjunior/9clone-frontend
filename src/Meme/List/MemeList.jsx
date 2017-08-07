import { Loader } from 'semantic-ui-react';
import Infinite from 'react-infinite'
import React from 'react'
import _ from 'lodash'

import Meme from './Meme'
import ajax from '../../Shared/ajax'

const responseToComponent = ({id, attributes: {url, title}}) => (
  <Meme key={id} {...{url, title}} />
)

class MemeList extends React.Component {
  state = {
    memes: [],
    page: 1,
    created: false
  }

  componentWillReceiveProps({lastCreated, response: {data}, ...props}) {
    if(lastCreated > this.props.lastCreated) {
      this.fetchPage(1, 1)
      return this.setState({created: true});
    }
    if(!data) return

    const { memes, created } = this.state;

    return this.setState({
      memes: created? _.unionBy(data, memes, 'id') : _.unionBy(memes, data, 'id'),
      created: false
    })
  }

  fetchPage(page, items_per_page=10) {
    return this.props.reload({page, items_per_page})
  }

  fetchNextPage() {
    const {page} = this.state
    const nextPage = page+1

    this.setState({page: nextPage})
    return this.fetchPage(nextPage)
  }

  loading() {
    return <Loader active>Loading</Loader>
  }

  render() {
    const { memes } = this.state;
    if(memes.length === 0) return <div>No records found</div>

    return (
      <Infinite
        elementHeight={576}
        infiniteLoadBeginEdgeOffset={300}
        useWindowAsScrollContainer
        loadingSpinnerDelegate={this.loading()}
        isInfiniteLoading={this.props.loading}
        onInfiniteLoad={() => this.fetchNextPage()}>
        {!!memes? memes.map(responseToComponent) : null}
      </Infinite>
    )
  }
}

export { MemeList }
export default ajax({
  url: '/memes',
  params: {page: 1, items_per_page: 10}
})(MemeList)
