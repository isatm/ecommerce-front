import { IconType } from 'react-icons';

export interface ButtonProps {
    type: number;
    content: string;
    icon?: IconType; // el icon se vuelve opcional además de indica que con react-icon se le pone seleccionar entre los icon de react
}