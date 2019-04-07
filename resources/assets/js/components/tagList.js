//IE11用に追加
import "@babel/polyfill";
//@babel/polyfillにはfetchが含まれてないので追加
import 'whatwg-fetch'

import moment from 'moment'

import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import MetaTags from 'react-meta-tags'

//Loadingコンポーネント
import Loading from './loading'
//404コンポーネント
import NotFound from './404'

const rest_url = "https://codecodeweb.com/wp-json/wp/v2/posts"
const meta_url = "https://codecodeweb.com/wp-json/wp/v2/tags"

//メインコンポーネント
class TagList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            postData: [],
            metaData: [],
            isError: 0
        }
    }
    
    componentWillMount(){
        this.setState({ isLoading: true })
        
        fetch(meta_url + "/"+ this.props.match.params.id)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }else{
                this.setState({
                    isError: response.status,
                    isLoading: false
                })
            }
        })
        .then((responseMetaData) => {
            this.setState({
                metaData: [responseMetaData]
            })
        })
        
        fetch(rest_url + "?tags="+ this.props.match.params.id + "&_embed")
        .then((response) => {
            if (response.ok) {
                return response.json()
            }else{
                this.setState({
                    isError: response.status,
                    isLoading: false
                })
            }
        })
        .then((responseData) => {
            this.setState({
                postData: responseData,
                isLoading: false
            })
        })
    }

    render(){
        if(this.state.isLoading) {
            return <Loading />
        }
        
        if(this.state.isError != 0) {
            return <NotFound />
        }
        
        return(
            <div className="tags">
                {this.state.metaData.map(meta => {
                    return(
                        <div className="metaTitle">
                            <MetaTags>
                                <meta name="robots" content="noindex" />
                                <title>カテゴリー:{ meta.name } | CodeCode</title>
                            </MetaTags>
                            <h2 key={ meta.id }><strong>{ meta.name }</strong>のタグがついた記事</h2>
                        </div>
                    )
                })}
                <ul className="blogList">
                    {this.state.postData.map(item => {
                        return (
                            <li key={ item.id } className="post_inner">
                                <span className="date">{ moment(item.date).format("YYYY.MM.DD") }</span>
                                <Link to={'/blog/'+item.id}>
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
