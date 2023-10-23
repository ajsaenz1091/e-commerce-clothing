import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dorpdown.component';

import { NavigationContainer, LogoContainer, NavLink, NavLinks  } from './navigation.styles';

const Navigation = () => {

  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
        <NavLink to='/shop'>
          SHOP
        </NavLink>
        <NavLink to='/contact'>
          CONTACT
        </NavLink>
        {
          currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>
              SIGN IN
            </NavLink>
          )
        }
        <CartIcon />
        </NavLinks>
        {
          isCartOpen && <CartDropdown />
        }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;