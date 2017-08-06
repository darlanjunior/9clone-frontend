import React from 'react'
import Infinite from 'react-infinite'
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

  componentWillReceiveProps({lastCreated, response: {data}}) {
    console.log(lastCreated, this.props.lastCreated)
    if(lastCreated > this.props.lastCreated) {
      this.setState({created: true})
      this.fetchPage(1, 1)
      return;
    }

    const { memes, created } = this.state;

    this.setState({
      memes: created? memes.concat(data) : data.concat(memes),
      created: false
    })
  }

  fetchPage(page, items_per_page=null) {
    this.props.reload({page, items_per_page})
  }

  fetchNextPage() {
    const {page} = this.state
    const nextPage = page+1

    this.setState({page: nextPage})
    this.fetchPage(nextPage)
  }

  render() {
    const { memes } = this.state;
    if(memes.length === 0) return <div>Loading...</div>

    return (
      <Infinite
        elementHeight={576}
        infiniteLoadBeginEdgeOffset={300}
        useWindowAsScrollContainer
        loadingSpinnerDelegate={<div>Loading...</div>}
        isInfiniteLoading={this.props.loading}
        onInfiniteLoad={() => this.fetchNextPage()}>
        {!!memes? memes.map(responseToComponent) : null}
      </Infinite>
    )
  }
}

export default ajax({
  url: '/memes',
  params: {page: 1, items_per_page: 10}
})(MemeList)
