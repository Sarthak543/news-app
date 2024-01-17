import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
    static defaultProps={
        country:"in",
        pageSize:8,
        category:"general"
    }
    
    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7e2145519ba342368f014c3d35d38ddc&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:'true'})
        let data = await fetch(url);
        let parseData=await data.json();
        this.setState({
            articles:parseData.articles,
            totalResults:parseData.totalResults,
            loading:false})
    }

    handlePreviousClick=async()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7e2145519ba342368f014c3d35d38ddc&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:'true'})
        let data = await fetch(url);
        let parseData=await data.json();
        this.setState({
            page:this.state.page-1,
            articles:parseData.articles,
            loading:false
        })
    }
    handleNextClick=async()=>{
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7e2145519ba342368f014c3d35d38ddc&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:'true'})
            let data = await fetch(url);
            let parseData=await data.json();
            this.setState({
                page:this.state.page+1,
                articles:parseData.articles,
                loading:false
            })
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center'>News Monkey top headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles && this.state.articles.length > 0 && this.state.articles.map((element) => {
                        return <div className="col md-4 mx-3 my-2" key={element.url}>
                            {console.log(element.title)}
                            <NewsItem title={element.title!==null?element.title.slice(0,45):""} description={element.description!==null?element.description.slice(0,88):""} imageURL={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} category={element.category} source={element.source.name}/>
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-outline-secondary" onClick={this.handlePreviousClick}>&larr;Previous</button>
                <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-outline-secondary" onClick={this.handleNextClick}>Next&rarr;</button>
                </div>
            </div>
        )
    }
}