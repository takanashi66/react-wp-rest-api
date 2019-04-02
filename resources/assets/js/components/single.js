//IE11用に追加
import "@babel/polyfill";
//@babel/polyfillにはfetchが含まれてないので追加
import 'whatwg-fetch'

import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

//Loadingコンポーネント
import Loading from './loading'

const rest_url = "http://codecodeweb.d/wp-json/wp/v2/posts/"

//メインコンポーネント
class Single extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            postData: []
        }
    }

    componentWillMount(){
        this.setState({ isLoading: true })
        
        fetch(rest_url + this.props.match.params.id + "?_embed")
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                postData: [responseData],
                isLoading: false
            })
        })
    }

    render(){
        if(this.state.isLoading) {
            return <Loading />
        }
        
        return(
            <article>
                {this.state.postData.map(item =>{
                    return (
                        <div key={item.id} className="single">
                            <h2>{item.title.rendered}</h2>
                            <div className="meta">
                                <ul className="categories">
                                    {/*タグを出力する即時関数*/}
                                    {(() => {
                                        const items = []
                                        for(let i in item._embedded['wp:term']){
                                            for(let j in item._embedded['wp:term'][i]){
                                                if(item._embedded['wp:term'][i][j].taxonomy === "category"){
                                                    items.push(
                                                        <li key={item._embedded['wp:term'][i][j].id}>
                                                            <Link to={'/categories/' + item._embedded['wp:term'][i][j].id}>
                                                                {item._embedded['wp:term'][i][j].name}
                                                            </Link>
                                                        </li>
                                                    )
                                                }
                                            }
                                        }
                                        return items
                                    })()}
                                    
                                </ul>
                                <ul className="tags">
                                    {/*タグを出力する即時関数*/}
                                    {(() => {
                                        const items = []
                                        for(let i in item._embedded['wp:term']){
                                            for(let j in item._embedded['wp:term'][i]){
                                                if(item._embedded['wp:term'][i][j].taxonomy === "post_tag"){
                                                    items.push(
                                                        <li key={item._embedded['wp:term'][i][j].id}>
                                                            <Link to={'/tags/' + item._embedded['wp:term'][i][j].id}>
                                                                {item._embedded['wp:term'][i][j].name}
                                                            </Link>
                                                        </li>
                                                    )
                                                }
                                            }
                                        }
                                        return items
                                    })()}
                                    
                                </ul>
                            </div>
                            <div className="contents" dangerouslySetInnerHTML={{__html: item.content.rendered}}></div>
                            <p className="return">
                                <Link to="/">トップに戻る</Link>
                            </p>
                        </div>
                    )
                })}
            </article>
        )
    }
}

export default Single
