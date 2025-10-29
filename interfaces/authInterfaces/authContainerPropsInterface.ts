
import { ReactNode } from "react";

export interface AuthContainerProps {
    title: string;
    subtitle?: string;
    link?: { href: string; text: string; label: string };
    videoSrc?: string;
    children: ReactNode;
}
