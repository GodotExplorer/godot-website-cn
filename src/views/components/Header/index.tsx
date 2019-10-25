import * as React from "react"
import "./style.css"
import { Link } from "react-router-dom"
import { MenuItem } from "types/app"

export namespace Header {
	export interface Props extends React.Props < void > {
		items: MenuItem[]
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
														{
															this.props.items.filter(item=>item.align == 'left').map(item=>
																<li><Link to={item.path}>{item.title}</Link></li>
															)
														}
                        </ul>
                        <ul className="right">
                            {
															this.props.items.filter(item=>item.align == 'right').map(item=>
																<li><Link to={item.path}>{item.title}</Link></li>
															)
														}
                            <li><a href="#" id="asset_lib">
                                <img src="assets/images/asset_lib.svg"></img>
                                </a>
														</li>
                        </ul>
                    </nav>
                </div>
            </header>

        )
    }
}
