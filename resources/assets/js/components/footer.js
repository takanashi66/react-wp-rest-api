//IE11用に追加
import "@babel/polyfill";
//@babel/polyfillにはfetchが含まれてないので追加
import 'whatwg-fetch'

import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const categories_url = "https://codecodeweb.com/wp-json/wp/v2/categories?per_page=10"
const tags_url = "https://codecodeweb.com/wp-json/wp/v2/tags?per_page=20"

//メインコンポーネント
class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            tags: []
        }
    }
    
    componentWillMount(){
        fetch(categories_url)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                categories: responseData
            })
        })
        
        fetch(tags_url)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                tags: responseData
            })
        })
    }

    render(){
        return(
            <footer className="footer">
                <div className="footer_inner">
                    <div className="categories_list">
                        <h2>カテゴリー</h2>
                        <ul className="categories">
                            {this.state.categories.map(categoriesItem =>{
                                return(
                                    <li key={categoriesItem.id}>
                                        <Link to={'/categories/' + categoriesItem.id}>
                                            {categoriesItem.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="tags_list">
                        <h2>タグ</h2>
                        <ul className="tags">
                            {this.state.tags.map(tagsItem =>{
                                return(
                                    <li key={tagsItem.id}>
                                        <Link to={'/tags/' + tagsItem.id}>
                                            {tagsItem.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <p className="copy">&copy; CodeCode.</p>
                </div>
            </footer>
        )
    }
}

export default Footer
