//IE11用に追加
import "@babel/polyfill";
//@babel/polyfillにはfetchが含まれてないので追加
import 'whatwg-fetch'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

//BlogListコンポーネント
import BlogList from './components/blogList'
//TagListコンポーネント
import TagList from './components/tagList'
//CategoryListコンポーネント
import CategoryList from './components/categoryList'
//Singleコンポーネント
import Single from './components/single'
//404コンポーネント
import NotFound from './components/404'
//Footerコンポーネント
import Footer from './components/footer'

const rest_url = "http://codecodeweb.d/wp-json/wp/v2/posts?_embed"
const rest_page = "&page="
const rest_per_page = "&per_page=10"

//メインコンポーネント
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            data: []
        }
    }
    
    OnClickNextPage(){
        this.setState({
            page: ++this.state.page
        })
        
        fetch(rest_url + rest_page + this.state.page + rest_per_page)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                data: responseData
            })
        })
    }
    
    OnClickPrevPage(){
        this.setState({
            page: --this.state.page
        })
        
        fetch(rest_url + rest_page + this.state.page + rest_per_page)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                data: responseData
            })
        })
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
        fetch(rest_url + rest_page + this.state.page + rest_per_page)
        .then((response) => {
            console.log(response.headers.get('x-wp-totalpages'))
            return response.json()
        })
        .then((responseData) => {
            this.setState({
                data: responseData
            })
        })
    }

    render(){
        return(
            <div className="wrap">
                <Router>
                    <header className="header"><h1>CodeCode</h1></header>
                    <main className="main">
                        <Switch>
                            <Route exact path='/' render={() => <BlogList data={this.state.data} OnClickNextPage={this.OnClickNextPage.bind(this)} OnClickPrevPage={this.OnClickPrevPage.bind(this)} />} />
                            <Route exact path="/:id" component={Single} />
                            <Route exact path="/categories/:id" component={CategoryList} />
                            <Route exact path="/tags/:id" component={TagList} />
                            <Route render={() => <NotFound />} />
                        </Switch>
                    </main>
                    <Footer />
                </Router>
            </div>
        )
    }
}

//レンダリング
ReactDOM.render(
    <App/>,
    document.getElementById('root')
)
