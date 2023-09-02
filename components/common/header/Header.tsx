import { useState, useCallback, memo, useEffect, useLayoutEffect, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from "next-i18next";
import { twMerge } from 'tailwind-merge';
import { gsap } from 'gsap-trial';



import StyleAnimation from '@/styles/animation.module.scss';
import { Navbar, Logo, Link, Button, containerStyle, Modal, Text, Title } from "@/components/ui";
import { HamburgerMenu, SwitchLang } from '@/components/common';

import { getMenuItems } from '@/conf/router';
const menuHamburgerItems = getMenuItems('hamburger');
const menuSocialNetworks = getMenuItems('socialNetworks');

import { ScrollProvider } from '@/context/ScrollContext';

const GAP_SIZE_LG = 'gap-4 sm:gap-6 lg:gap-7 xl:gap-8';
const GAP_SIZE_XL = 'gap-8 mdl:gap-12';
const BASE_LOCALE_MENU = 'header.menu';
const BASE_LOCALE_SOCIAL = 'socialNetwork';

const DURATION = 0.4;
const TRANSLATE_Y = -110;



const Header = () => {
    const { t } = useTranslation();
    const router = useRouter();
    let [openMenu, setOpenMenu] = useState<boolean>(false);
    const tl = useRef<gsap.core.Timeline>(gsap.timeline({ paused: true }));
    const ctx = useRef<any>(null);
    const { scrollbar } = useContext(ScrollProvider);
    useEffect(() => {
        ctx.current = gsap.context((self) => {
            self.add('open', () => {
                tl.current.fromTo(['.modal-overlay', '.modal-content'], {
                    opacity: 1,
                    yPercent: TRANSLATE_Y,
                    transformOrigin: 'right top',
                    skewY: 2,
                    onStartParams: [scrollbar]
                }, {
                    duration: DURATION,
                    ease: 'power3.inOut',
                    yPercent: 0,
                    skewY: 0,
                    stagger: {
                        amount: .2
                    }
                }).to(['.subElement-item'], {
                    duration: DURATION / 2,
                    yPercent: 100,
                    ease: 'power3.inOut'
                }, '<').from('.modal-item', {
                    duration: DURATION / 2,
                    yPercent: 100,
                    opacity: 0,
                    ease: 'power3.inOut',
                    stagger: {
                        amount: .2
                    }
                }).fromTo('.modal-close', {
                    display: 'none',
                    opacity: 0,
                }, {
                    opacity: 1,
                    ease: 'power3.inOut',
                    duration: DURATION / 2,
                    display: 'block',
                }).from('.modal-description', {
                    duration: DURATION,
                    yPercent: 100,
                    opacity: 0,
                    ease: 'power3.inOut',
                }, '<').from('.modal-footer', {
                    duration: DURATION / 2,
                    yPercent: 100,
                    opacity: 0,
                    transformOrigin: 'center bottom',
                    ease: 'power3.inOut',
                }, '<50%').from('.modal-item-info', {
                    xPercent: -100,
                    transformOrigin: 'left center',
                    ease: 'power3.inOut',
                    duration: DURATION / 2,
                }, '<25%')
                tl.current.play();
                scrollbar && scrollbar.updatePluginOptions('modal', {
                    open: true,
                })

            });
            self.add('close', () => {
                tl.current.reverse().then(() => {
                    setOpenMenu(false)
                    ctx.current.revert(); // revert timeline to the beginning
                    scrollbar && scrollbar.updatePluginOptions('modal', {
                        open: false,
                    });
                });
            });
        });
        return () => {
            ctx.current.revert();
        }
    }, [])
    const menuHandler = useCallback(() => {
        if (!openMenu) {
            setOpenMenu(true);
        } else {
            ctx.current.close();
        }
    }, [router.asPath, openMenu]);
    useEffect(() => {
        if (openMenu) {
            ctx.current.open();
        }
    }, [openMenu])

    const onButtonClick = useCallback((path: string) => {
        if (!openMenu) {
            router.push(path);
        } else {
            tl.current.reverse().then(() => {
                setOpenMenu(false);
                router.push(path);
            });
        }
    }, [openMenu]);

    return (
        <Modal isOpenExternal={openMenu} menuHandler={menuHandler}  >
            <Navbar size='lg' inTopOfScroll={openMenu} >
                <Navbar.Content className={twMerge('flex-1', GAP_SIZE_LG)}>
                    <Link href={`mailto:${t('header.email')}`} size='xs' weight='semibold' className='hidden mdl:flex'>{t('header.email')}</Link>
                    <span className="w-[1.2px] bg-gray-500 h-[14px] rotate-[25deg] hidden mdl:block" />
                    <SwitchLang />
                </Navbar.Content>
                <Navbar.Brand >
                    <span onClick={() => onButtonClick('/')}>
                        <Logo onPress={() => onButtonClick('/')} size={80} alt={t('header.logo')} mode='dark' />
                    </span>
                </Navbar.Brand>
                <Navbar.Content className={twMerge('flex-1 justify-end overflow-hidden', GAP_SIZE_LG)}>
                    <Button
                        onPress={() => onButtonClick('/contact')}
                        size='sm'
                        degree='1'
                        className={twMerge(
                            'py-2 border-none overflow-hidden',
                            'subElement-item hidden sm:block',
                            openMenu ? 'hidden' : '',
                            StyleAnimation['underline-animation'],
                        )}
                    >
                        {t('header.action')}
                    </Button>
                    <Modal.Button>
                        {({ handler, isOpen }) => {
                            return <>
                                <div className={twMerge('flex flex-row items-center gap-6 justify-end')} >
                                    <span className='overflow-hidden hidden xxs:block cursor-pointer' onClick={() => handler()}>
                                        <Text p size='xs' degree='3' className={twMerge('mr-2 hidden', 'modal-close')}>{t('header.close')}</Text>
                                    </span>
                                    <HamburgerMenu isOpen={isOpen} setOpen={handler} />
                                </div>
                            </>
                        }}
                    </Modal.Button>
                    <Modal.Overlay className={twMerge('opacity-0 fixed left-0 top-0 w-full min-h-full bg-primary-500 modal-overlay')}>
                        <Modal.Content isDismissable className={twMerge('bg-black-200 modal-content')}>
                            {({ handler }) => (
                                <div className={twMerge(
                                    'flex flex-col justify-between',
                                    'min-h-screen w-screen',
                                    'py-8 sm:py-12',
                                    containerStyle({ size: 'lg' })
                                )}>
                                    <div className='h-5 xxs:h-0'></div>
                                    <div className={twMerge('flex flex-col sm:flex-row sm:justify-between', 'gap-10 sm:gap-0','items-start sm:items-end md:items-center')} >
                                        <ul className={twMerge('flex flex-col gap-6 lg:gap-4', 'w-full sm:w-8/12')}>
                                            {menuHamburgerItems.map((item, index) => {
                                                return <li key={index} className={twMerge('flex flex-col items-start', 'overflow-hidden')}>
                                                    <div className={twMerge('flex flex-row justify-start items-start relative cursor-pointer', 'modal-item')} >
                                                        <Button size='auto' onPress={() => {
                                                            onButtonClick(item.link)
                                                        }} degree='1' className={
                                                            twMerge(
                                                                'capitalize relative text-white-600 bg-black-200 z-10 hover:text-primary-500',
                                                                'text-7xl sm:text-8xl mdl:text-9xl lg:text-15xl xl:text-[5rem] font-bold leading-tight tracking-wide transition-colors duration-150'
                                                            )}>
                                                            {t(`${BASE_LOCALE_MENU}.${item.id}.attribute`)}
                                                        </Button>
                                                        <span className='overflow-hidden'>
                                                            {t(`${BASE_LOCALE_MENU}.${item.id}.more`) !== 'null' ? <Text size='xs' p degree='4' className='absolute overflow-hidden left-[calc(100%_+_4px)] w-full top-[19%] modal-item-info'>{t(`${BASE_LOCALE_MENU}.${item.id}.more`)}</Text> : null}
                                                        </span>
                                                    </div>
                                                </li>
                                            })}
                                        </ul>
                                        <div className={twMerge('flex flex-col gap-2 xxs:gap-4', 'w-full xxs:max-w-[75%] sm:max-w-[32%] mdl:w-min')} >
                                            <span className='overflow-hidden mdl:w-max'>
                                                <Title h6 degree='2' weight='bold' className='uppercase tracking-widest overflow-hidden modal-description' >
                                                    {t('header.description.title')}
                                                </Title>
                                            </span>
                                            <span className='overflow-hidden w-fit mr-1 mdl:mr-6'>
                                                <Text p degree='4' size='xs' className='modal-description overflow-hidden'>
                                                    {t('header.description.content')}
                                                </Text>
                                            </span>
                                        </div>
                                    </div>
                                    <div className={twMerge('flex flex-col xxs:flex-row justify-between items-start xxs:items-end', 'gap-2 xxs:gap-0')}>
                                        <div className={twMerge('flex flex-row justify-start items-center', 'order-2 xxs:order-1' , 'overflow-hidden')}>
                                            <Text p degree='4' size='sm' className='modal-footer'>
                                                {t('header.copyright')}
                                            </Text>
                                        </div>
                                        <ul className={twMerge('flex flex-row items-center justify-end order-1 xxs:order-2', GAP_SIZE_XL)}>
                                            {menuSocialNetworks.map((item, index) => {
                                                return <li key={index} className='overflow-hidden'>
                                                    <Link size='sm' href={item.link} degree='4' weight='semibold' className='modal-footer' >
                                                        {t(`${BASE_LOCALE_SOCIAL}.${item.id}.key`)}
                                                    </Link>
                                                </li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </Modal.Content>
                    </Modal.Overlay>
                </Navbar.Content>
            </Navbar>
        </Modal>
    )
}

export default memo(Header);