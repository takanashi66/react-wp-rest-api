import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import moment from 'moment'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

//Stateless Functions
const BlogList = props =>{
    
    return(
        <div className="blog_list">
            <ul className="blogList">
                {props.data.map(item => {
                    return (
                        <li key={ item.id } className="post_inner">
                            <span className="date">{ moment(item.date).format("YYYY.MM.DD") }</span>
                            <Link to={'/'+item.id}>
                                <span className="title">{ item.id } { item.title.rendered }</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <ul className="pager">
                <li className="btn_prev" onClick={props.OnClickPrevPage}>前のページ</li>
                <li className="btn_next" onClick={props.OnClickNextPage}>次のページ</li>
            </ul>
        </div>
    )
}

export default BlogList
