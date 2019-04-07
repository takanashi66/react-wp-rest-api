import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import MetaTags from 'react-meta-tags'

//Stateless Functions
const NotFound = () =>(
    <div className="notfound">
        <MetaTags>
            <title>404 NOT FOUND | CodeCode</title>
        </MetaTags>
        <h2>404</h2>
        <p>Not Found</p>
        <p className="return">
            <Link to="/">トップに戻る</Link>
        </p>
    </div>
)

export default NotFound
