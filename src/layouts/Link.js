import { Link } from 'react-router-dom';
import { cls } from '../utils/helpers';

const NavLink = ({changeNavbar, children, ...rest}) => {
    return (
        <Link
            onClick={changeNavbar}
            className="inline-block mr-4 hover:text-secondary"
            { ...rest }
        >
            {children}
        </Link>
    )
}

const classes  = {
    base: 'text-sm text-primary font-normal',
    disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
}

const SidebarLink = ({children, disabled, className, ...rest}) => {
    return (
        <Link
            className={cls(`
                ${classes.base}
                ${disabled && classes.disabled}
                ${className || ''}
            `)}
            { ...rest }
        >
            {children}
        </Link>
    )
}

export {
    NavLink,
    SidebarLink,
}