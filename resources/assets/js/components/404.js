import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

//Stateless Functions
const NotFound = () =>(
    <div className="notfound">
        <h2>404</h2>
        <p>Not Found</p>
        <p className="return">
            <Link to="/">トップに戻る</Link>
        </p>
    </div>
)

export default NotFound
