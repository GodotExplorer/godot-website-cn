import * as React from "react"
import "./style.css"

export namespace Header {
	export interface Props extends React.Props < void > {
	}

	export interface State {
	}
}
export default class Header extends React.Component<Header.Props,Header.State>{
    render(){
        return(
            <header>
                <div className="container">
                    <input type="checkbox" id="nav_toggle_cb"></input>
                    <div id="nav_head">
                        <a href="#" id="logo-link">
                            <img src="assets/images/logo.svg" className="nav-logo" alt="Godot Engine"></img>
                        </a>
                        <label htmlFor="nav_toggle_cb" id="nav_toggle_btn">
                            <img src="assets/images/hamburger.svg"></img>
                        </label>
                    </div>
                    <nav id="nav">
                        <ul className="left">
                            <li><a href="#">特性</a></li>
                            <li><a href="#">新闻</a></li>
                            <li><a href="#">社区</a></li>
                            <li><a href="#">更多</a></li>
                        </ul>
                        <ul className="right">
                            <li><a href="#">下载</a></li>
                            <li><a href="#">学习</a></li>
                            <li><a href="#" id="asset_lib">
                                <img src="assets/images/asset_lib.svg"></img>
                                </a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            
        )
    }
}