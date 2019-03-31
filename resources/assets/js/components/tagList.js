//IE11用に追加
import "@babel/polyfill";
//@babel/polyfillにはfetchが含まれてないので追加
import 'whatwg-fetch'

import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const rest_url = "http://codecodeweb.d/wp-json/wp/v2/posts/"

//メインコンポーネント
class TagList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postData: []
        }
    }

    render(){
        return(
            <p>ID: {this.props.match.params.id}</p>
        )
    }
}

export default TagList
