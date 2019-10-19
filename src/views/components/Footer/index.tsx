import * as React from "react"
import "./style.css"

export default class Footer extends React.Component{
    render(){
        return(
            <footer>
                <div className="container">
                    <div id="copyright">
                        © 2007-2019 Juan Linietsky, Ariel Manzur and <a href="https://github.com/godotengine/godot/blob/master/AUTHORS.md" target="_blank">contributors</a><br></br>
                        Godot is a member of the <a href="https://sfconservancy.org/" target="_blank">Software Freedom Conservancy</a><br></br>
                        Kindly hosted by <a href="https://tuxfamily.org" target="_blank">TuxFamily.org</a>
                    </div>
                    <ul id="sitemap">
                        <li>
                            <a href="#">新闻</a>
                        </li>
                        <li>
                            <a href="#">社区</a>
                        </li>
                        <li>
                            <a href="#">文档</a>
                        </li>
                        <li>
                            <a href="#">下载</a>
                        </li>
                        <li>
                            <a href="#">捐赠</a>
                        </li>
                    </ul>
                    <div id="social">
                        <h4 className="text-right">
                            <a href="#">联系我们</a>
                        </h4>
                        <div className="justify-space-between">
                            <a href="https://www.facebook.com/groups/godotengine/" target="_blank">
                                <img src="assets/images/footer/facebook_logo.svg" alt=""></img>
                            </a>
                            <a href="https://twitter.com/godotengine" target="_blank">
                                <img src="assets/images/footer/twitter_logo.svg" alt=""></img>
                            </a>
                            <a href="https://github.com/godotengine" target="_blank">
                                <img src="assets/images/footer/github_logo.svg" alt=""></img>
                            </a>
                            <a href="https://www.reddit.com/r/godot" target="_blank">
                                <img src="assets/images/footer/reddit_logo.svg" alt=""></img>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}