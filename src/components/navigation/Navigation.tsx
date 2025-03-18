import { NavLink } from "react-router"
import Container from "../Container";



const Navigation: React.FC = () => {
    return (
        <div className="navigation-wrapper">
            <nav className="main-navigation">
                <Container>
                    <ul className="nav-list">
                    <li className="nav-item">
                            <NavLink className='nav-link' to="/" end>Home</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className='nav-link' to="/amplifiers" end>Amplifiers</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to="/brands" end>Brands</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to="/useCases" end>useCases</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to="/categories" end>Categories</NavLink>
                        </li>
                    </ul>
                </Container>
            </nav>
        </div>
    )
}

export default Navigation;