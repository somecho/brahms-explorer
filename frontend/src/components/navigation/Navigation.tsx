import { FC } from "react";
import "./Navigation.css"
import { Link } from "react-router-dom"
import getCookie from 'react-use-cookie';
import useCookie from 'react-use-cookie';

interface NavigationProps {
};


const Navigation: FC<NavigationProps> = () => {
	const currentUser = getCookie('currentUser')
	const [user, setUser] = useCookie('currentUser', currentUser[0])

	return (
		<nav id="site-nav">
			<ul>
				<li>
					<Link to="/about">about</Link>
				</li>
				{!user &&
					<li>
						<Link to="/login">login</Link>
					</li>
				}
				{user &&
					<li>
						<Link to="/logout">logout</Link>
					</li>
				}
			</ul>
		</nav>
	)
}

export default Navigation;
