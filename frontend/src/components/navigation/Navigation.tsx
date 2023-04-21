import { FC } from "react";
import "./Navigation.css"
import { Link } from "react-router-dom"

interface NavigationProps { };

const Navigation: FC<NavigationProps> = () => {
	return (
		<nav id="site-nav">
			<ul>
				<li>
					<Link to="/about">about</Link>
				</li>
				<li>
					{/* TODO: Change this link after implementing login*/}
					<Link to="#">login</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Navigation;
