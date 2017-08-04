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
    page: 1
  }

  componentWillReceiveProps(nextProps) {
    const { memes } = this.state;

    this.setState({
      memes: memes.concat(nextProps.response.data)
    })
  }

  fetchNextPage() {
    const {page} = this.state
    this.props.reload({page: page+1})

    this.setState({page: page+1})
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
