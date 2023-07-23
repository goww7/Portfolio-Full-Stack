import React, { useState } from 'react';
import { MenuTrigger, Button, Popover, Menu, Item} from 'react-aria-components';
import type { MenuTriggerProps, ButtonProps, PopoverProps, MenuProps, ItemProps } from 'react-aria-components';

import { twMerge } from 'tailwind-merge';
import { mergeClassName } from '@/helpers/className'

const MenuContext = React.createContext<{ isOpen: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }>({
    isOpen: false,
    setOpen: () => { },
});

const MenuUi = ({ children, ...props }: { children: React.ReactNode | React.ReactNode[] } & MenuTriggerProps) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    return (
        <MenuTrigger {...props}>
            <MenuContext.Provider value={{ isOpen, setOpen }}>
                {children}
            </MenuContext.Provider>
        </MenuTrigger>
    )
}

const ButtonUi = ({ children, className = '', ...props }: { children: (({ open }: { open: () => void }) => React.ReactElement) } & { className?: string } | { children: React.ReactNode } & Omit<ButtonProps, 'children'>): React.ReactElement => {
    const { isOpen, setOpen } = React.useContext(MenuContext);
    return typeof children == 'function' ? children({ open: () => setOpen(true) }) : <Button className={mergeClassName('outline-none', className)} onPress={() => setOpen(true)} {...props}>{children}</Button>
}

const MenuPopoverUi = ({ className, children, ...props }: {
    children: ((({ close }: { close: () => void }) => React.ReactNode) | React.ReactNode) | React.ReactNode
} & Omit<PopoverProps, 'children'> & React.RefAttributes<HTMLElement>) => {
    return <Popover className={mergeClassName('outline-none', className)} {...props}>
        {typeof children == 'function' ? <MenuContext.Consumer>
            {(value) => children({ close: () => value.setOpen(false) })}
        </MenuContext.Consumer> : children}</Popover>
}

const MenuCollectionUi = <T extends {}>({ children, className, ...props }: MenuProps<T> & React.RefAttributes<HTMLDivElement>) => {
    return (
        <Menu className={twMerge(className, 'outline-none')}  {...props}>
            {children}
        </Menu>
    )
}

const MenuItemUi = <T extends {}>({ className,...props }: ItemProps<T> ) => {
    return (
        <Item {...props} className={mergeClassName('outline-none', className)} />
    )
}



MenuUi.Button = ButtonUi;
MenuUi.Popover = MenuPopoverUi;
MenuUi.Collection = MenuCollectionUi;
MenuUi.Item = MenuItemUi;

export default MenuUi;