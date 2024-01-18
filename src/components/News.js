import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            totalResults: 0
        }
    }

    async updateNews() {
        this.props.setProgress(20)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api_key}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.props.setProgress(40)
        let parseData = await data.json();
        this.props.setProgress(80)
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults
        })
        this.props.setProgress(100)
    }


    async componentDidMount() {
        this.updateNews()
    }

    // handlePreviousClick = async () => {
    //     this.setState({
    //         page: this.state.page - 1
    //     })
    //     this.updateNews()
    // }
    // handleNextClick = async () => {
    //     this.setState({
    //         page: this.state.page + 1
    //     })
    //     this.updateNews()
    // }

    fetchData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api_key}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({ page: this.state.page + 1 })
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults
        })
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{marginTop:"100px",marginBottom:"30px"}}>News Monkey top headlines</h1>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<Spinner />}>
                    <div className="container">
                        <div className="row">
                            {this.state.articles && this.state.articles.length > 0 && this.state.articles.map((element) => {
                                return <div className="col md-4 mx-3 my-2" key={element.url}>
                                    <NewsItem title={element.title !== null ? element.title.slice(0, 45) : ""} description={element.description !== null ? element.description.slice(0, 88) : ""} imageURL={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} category={element.category} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}