import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import moment from 'moment'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

//Stateless Functions
const BlogList = props =>{
    return(
        <ul className="blogList">
            {props.data.map(item => {
                return (
                    <li key={ item.id } className="post_inner">
                        <span className="date">{ moment(item.date).format("YYYY.MM.DD") }</span>
                        <Link to={'/'+item.id}>
                            <span className="title">{ item.title.rendered }</span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default BlogList
