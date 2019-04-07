import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import moment from 'moment'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

//Loadingコンポーネント
import Loading from './loading'
//404コンポーネント
import NotFound from './404'

const rest_url = "https://codecodeweb.com/wp-json/wp/v2/posts?_embed"
const rest_page = "&page="
const rest_per_page = "&per_page=10"

//メインコンポーネント
class BlogList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            page: 1,
            data: [],
            isError: 0
        }
    }
    
    componentWillMount(){
        this.setState({ isLoading: true })
        
        fetch(rest_url + rest_page + this.state.page + rest_per_page)
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
                data: responseData,
                isLoading: false
            })
        })
    }
    
    render(){
        if(this.state.isLoading) {
            return <Loading key={this.state.isLoading} />
        }
        
        if(this.state.isError != 0) {
            return <NotFound />
        }
    
        return(
            <div className="blog_list">
                <ul className="blogList">
                    {this.state.data.map(item => {
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
                <ul className="pager">
                    <li className="btn_next"><Link to={"/page/2"}>次のページ</Link></li>
                </ul>
            </div>
        )
    }
}

export default BlogList
