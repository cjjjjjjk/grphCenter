import { useCallback } from "react";

export const useRippleEffect = () => {
    return useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const button = event.currentTarget;

        const ripple = document.createElement("span");
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.className = "absolute bg-white opacity-80 rounded-full animate-ripple";

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 500);
    }, []);
};
