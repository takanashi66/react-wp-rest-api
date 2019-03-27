//IE11用に追加
import "@babel/polyfill";
//@babel/polyfillにはfetchが含まれてないので追加
import 'whatwg-fetch'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'

//BlogListコンポーネント
import BlogList from './components/blogList'
//Singleコンポーネント
import Single from './components/single'

const rest_url = "http://codecodeweb.d/wp-json/wp/v2/posts/"

//メインコンポーネント
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    //JSONデータの改行を変換
    nl2br(text){
        const regex = /(\n)/g
        return text.split(regex).map((line, i) =>{
            if(line.match(regex)) {
                return <br key={i} />
            }else{
                return line;
            }
        });
    }
    
    //0埋め
    getdoubleDigestNumer(number){
        return ("0" + number).slice(-2)
    }

    componentWillMount(){
        fetch(rest_url)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                data: responseData
            })
        })
    }

    render(){
        return(
            <div className="wrap">
                <header className="header"><h1>CodeCode</h1></header>
                <main className="main">
                    <BrowserRouter>
                        <Route exact path='/' render={() => <BlogList data={this.state.data} />} />
                        {this.state.data.map(item => {
                            return (
                                <Route key={item.id} exact path={'/'+item.id} render={() => <Single id={item.id} />} />
                            )
                        })}
                    </BrowserRouter>
                </main>
            </div>
        )
    }
}

//レンダリング
ReactDOM.render(
    <App/>,
    document.getElementById('root')
)
