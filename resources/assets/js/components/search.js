//IE11用に追加
import "@babel/polyfill";
//@babel/polyfillにはfetchが含まれてないので追加
import 'whatwg-fetch'

import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const rest_url = "https://codecodeweb.com/wp-json/wp/v2/posts/"

//メインコンポーネント
class Single extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            postData: []
        }
    }

    componentWillMount(){
        
    }

    render(){
        return(
            <div className="search">
                <form action="./">
                    <input type="search"/>
                    <input type="submit" value="検索"/>
                </form>
            </div>
        )
    }
}

export default Single
