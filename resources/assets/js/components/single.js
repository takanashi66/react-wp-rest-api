//IE11用に追加
import "@babel/polyfill";
//@babel/polyfillにはfetchが含まれてないので追加
import 'whatwg-fetch'

import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const rest_url = "http://codecodeweb.d/wp-json/wp/v2/posts/"

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
        fetch(rest_url+this.props.id)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                postData: [responseData]
            })
        })
        
    }

    render(){
        return(
            <article>
                {this.state.postData.map(item =>{
                    return (
                        <div className="single">
                            <h2 key={item.id}>{item.title.rendered}</h2>
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
