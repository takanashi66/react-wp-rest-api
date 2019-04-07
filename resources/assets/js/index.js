//IE11用に追加
import "@babel/polyfill"
//@babel/polyfillにはfetchが含まれてないので追加
import 'whatwg-fetch'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import MetaTags from 'react-meta-tags'

//Loadingコンポーネント
import Loading from './components/loading'
//BlogListコンポーネント
import BlogList from './components/blogList'
//BlogListコンポーネント
import PageList from './components/pageList'
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

//メインコンポーネント
class App extends Component {
    constructor(props) {
        super(props)
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

    render(){
        
        return(
            <div className="wrap">
                <MetaTags>
                    <title>CodeCode</title>
                </MetaTags>
                <Router>
                    <header className="header"><h1>CodeCode</h1></header>
                    <main className="main">
                        <Switch>
                            <Route exact path='/' component={BlogList} />
                            <Route exact path='/page/:id' component={PageList} />
                            <Route path="/blog/:id" component={Single} />
                            <Route path="/categories/:id" component={CategoryList} />
                            <Route path="/tags/:id" component={TagList} />
                            <Route component={NotFound} />
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
