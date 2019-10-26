import * as React from "react"
import "./style.css"
import { Link } from "react-router-dom"
import { MenuItem, RouterIndex } from "types/app"
import UserMenu from "./User"
import server from "server/server"

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
                        <Link to={RouterIndex.HOME}>
                            <img id="logo-link" src="assets/images/logo.svg" className="nav-logo" alt="Godot Engine"></img>
                        </Link>
                        <label htmlFor="nav_toggle_cb" id="nav_toggle_btn">
                            <img src="assets/images/hamburger.svg"></img>
                        </label>
                    </div>
                    <nav id="nav">
                        <ul className="left">
														{
															this.props.items.filter(item=>item.align == 'left').map(item=>
																<li key={item.title}><Link to={item.path}>{item.title}</Link></li>
															)
														}
												</ul>
												<ul className="right">
														{
															this.props.items.filter(item=>item.align == 'right').map(item=>
																<li key={item.title}><Link to={item.path}>{item.title}</Link></li>
															)
														}
														<UserMenu/>
												</ul>
										</nav>
								</div>
						</header>

				)
		}
}
