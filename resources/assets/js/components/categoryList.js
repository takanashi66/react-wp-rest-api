//IE11用に追加
import "@babel/polyfill";
//@babel/polyfillにはfetchが含まれてないので追加
import 'whatwg-fetch'

import moment from 'moment'

import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const rest_url = "http://codecodeweb.d/wp-json/wp/v2/posts"
const meta_url = "http://codecodeweb.d/wp-json/wp/v2/categories"

//メインコンポーネント
class TagList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postData: [],
            metaData: []
        }
    }
    
    componentWillMount(){
        fetch(meta_url + "/"+ this.props.match.params.id)
        .then((responseMeta) => responseMeta.json())
        .then((responseMetaData) => {
            this.setState({
                metaData: [responseMetaData]
            })
        })
        
        fetch(rest_url + "?categories="+ this.props.match.params.id + "&_embed")
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                postData: responseData
            })
        })
    }

    render(){
        return(
            <div className="categories">
                {this.state.metaData.map(meta => {
                    return <h2 key={ meta.id } className="metaTitle">カテゴリーが<strong>{ meta.name }</strong>の記事</h2>
                })}
                <ul className="blogList">
                    {this.state.postData.map(item => {
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
                <p className="return">
                    <Link to="/">トップに戻る</Link>
                </p>
            </div>
        )
    }
}

export default TagList
