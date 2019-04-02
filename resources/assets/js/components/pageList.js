import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import moment from 'moment'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";

//Loadingコンポーネント
import Loading from './loading'

const rest_url = "http://codecodeweb.d/wp-json/wp/v2/posts?_embed"
const rest_page = "&page="
const rest_per_page = "&per_page=10"

//メインコンポーネント
class PageList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            data: [],
            totalPages: 1,
            page: 1
            
        }
    }
    prevClick(){
        let prevNumber = Number(this.props.match.params.id) - 1
        
        if(prevNumber > 1){
            this.props.history.push('/page/' + prevNumber)
            
            this.setState({
                page: prevNumber
            })
            
            this.setState({ isLoading: true })
            
            fetch(rest_url + rest_page + prevNumber+ rest_per_page)
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {
                this.setState({
                    data: responseData,
                    isLoading: false
                })
            })
        }else{
            this.props.history.push('/')
        }
    }
    nextClick(){
        let nextNumber = Number(this.props.match.params.id) + 1
        this.props.history.push('/page/' + nextNumber)
        
        this.setState({
            page: nextNumber
        })
        
        this.setState({ isLoading: true })
        
        fetch(rest_url + rest_page + nextNumber+ rest_per_page)
        .then((response) => {
            return response.json()
        })
        .then((responseData) => {
            this.setState({
                data: responseData,
                isLoading: false
            })
        })
    }
    
    componentWillMount(){
        this.setState({ isLoading: true })
        
        fetch(rest_url + rest_page + this.props.match.params.id + rest_per_page)
        .then((response) => {
            console.log(response.headers.get('x-wp-totalpages'));
            this.setState({
                totalPages: response.headers.get('x-wp-totalpages')
            })
            
            return response.json()
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
                    <li className="btn_prev" onClick={this.prevClick.bind(this)}>前のページ</li>
                    {(() => {
                        if(this.state.totalPages > this.props.match.params.id ){
                            return(
                                <li className="btn_next" onClick={this.nextClick.bind(this)}>次のページ</li>
                            )
                        }
                    })()}
                </ul>
            </div>
        )
    }
}

export default withRouter(PageList)
