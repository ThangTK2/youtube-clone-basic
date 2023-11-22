import Logo from '../../assets/img/logo1.png'
import '../Navigation/Navigation.scss'
import useCrollY from '../Scroll';

const Navigation = () => {
    const [scrollY] = useCrollY();

    return(
        <div className="nav_container" style={scrollY < 50 ? {background: '#0f0f0f'} : {background: 'pink'}}> 
            <div className="logo">
                <img src={Logo} alt="Lỗi hiển thị"/>
            </div>
            <div className='title'>
                TK2 ♪
            </div>
        </div>
    )
}

export default Navigation;