import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {
        let { title, description, imageURL, newsUrl, author, date, category,source } = this.props;
        return (
            <div className='my-3'>
                <div className="card" style={{ width: "20rem" }}>
                    <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%"}}>
                        {source}
                        <span class="visually-hidden">unread messages</span>
                    </span>
                    <img src={imageURL ? imageURL : `https://source.unsplash.com/300x175/?${category}`} className="card-img-top" alt="..." style={{height:"12rem"}}/>
                    <div className="card-body" style={{height:"17rem"}}>
                        <h5 className="card-title">{title}{title.length === 45 ? "..." : ""}</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
