import React from 'react';

type ButtonComponentProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
    children,
    onClick,
    type = 'button',
    disabled = false,
    className = '',
}) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={className}
    >
        {children}
    </button>
);

export default ButtonComponent;
//variantes para diferentes tipos de botones con los diferentes tipos de classnames para que sea solo importarlas y cambiarle la funcionalidad