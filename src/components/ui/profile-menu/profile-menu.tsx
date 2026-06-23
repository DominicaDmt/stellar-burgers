import { FC } from 'react';
import styles from './profile-menu.module.css';
import { NavLink } from 'react-router-dom';
import { ProfileMenuUIProps } from './type';

export const ProfileMenuUI: FC<ProfileMenuUIProps> = ({
  pathname,
  handleLogout
}) => (
  <div className={styles.menu}>
    <NavLink
      to={'/profile'}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.link_active : ''} text text_type_main-medium pt-4 pb-4`
      }
      end
    >
      Профиль
    </NavLink>
    <NavLink
      to={'/profile/orders'}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.link_active : ''} text text_type_main-medium pt-4 pb-4`
      }
    >
      История заказов
    </NavLink>
    <button
      className={`${styles.button} text text_type_main-medium pt-4 pb-4`}
      onClick={handleLogout}
    >
      Выход
    </button>
    <p className='pt-20 text text_type_main-default text_color_inactive'>
      {pathname === '/profile'
        ? 'В этом разделе вы можете изменить свои персональные данные'
        : 'В этом разделе вы можете просмотреть свою историю заказов'}
    </p>
  </div>
);
