
import { twMerge } from "tailwind-merge";

import { Text, Button, Display, Icon, Link, Fit } from '@/components/ui';
import { useTranslation } from "next-i18next";
import { MENU_ITEMS } from "@/conf/router";

const ButtonNext = () => {
    return <>
        <Button className={twMerge('bg-white-200', 'rounded-full')}>
            <div className='p-3 xxs:p-3 xs:p-4 md:p-5 xl:p-6'>
                <Icon name='IconCornerLeftDown' className='stroke-black-200 stroke-1 w-8 h-8 xxs:w-6 xxs:h-6 xs:w-8 xs:h-8 xl:w-10 xl:h-10' />
            </div>
        </Button>
    </>
}

const DISPLAY_1_CLASS_NAME = 'capitalize';
const DISPLAY_2_CLASS_NAME = 'uppercase italic text-primary-500';
const FullStack = ({ className }: { className: string }) => {
    const { t } = useTranslation();

    return (
        <>
            <div className={twMerge(className, 'flex-col items-start xs:items-end pt-1 sm:pt-2 xl:pt-3', 'sm:-space-y-1 xl:space-y-0 2xl:-space-y-2')} >
                <Display size='md' weight='semibold' className={twMerge(DISPLAY_2_CLASS_NAME, 'tracking-[-0.05rem] sm:tracking-wider')}>{t('intro.title.2_1')}</Display>
                <Display size='md' weight='semibold' className={twMerge(DISPLAY_2_CLASS_NAME, 'tracking-[-0.05rem] sm:tracking-wider')}>{t('intro.title.2_2')}</Display>
            </div>
        </>
    )
}
const Title = () => {
    const { t } = useTranslation();

    return (<>
        {/* title 1  */}
        <div className={twMerge(
            // col
            'col-start-1 col-span-12',
            'xs:col-start-1 xs:col-span-9',
            'mdl:col-start-1 mdl:col-span-6',
            'xl:col-start-1 xl:col-span-6',
            '4xl:col-start-1 4xl:col-span-6',
            // row
            'row-start-1 row-span-1'
        )} >
            <Fit weight='bold' degree='1' className={twMerge(DISPLAY_1_CLASS_NAME)}>{t('intro.title.1')}</Fit>
        </div>
        {/* description */}
        <div className={twMerge('flex flex-row xxs:flex-col justify-between items-start xs:hidden',
            'col-start-1 col-span-12 xxs:col-span-4 row-start-3 row-span-1 xxs:row-start-2 xxs:row-span-1')}>
            <div className='justify-items-start order-2 xxs:order-1 flex'>
                <ButtonNext />
            </div>
            <FullStack className='flex order-1 xxs:order-3' />
        </div>

        <div className={twMerge(
            // flex
            'flex flex-col xs:flex-row justify-between mdl:justify-end',
            'gap-6 xxs:gap-8 xs:gap-4 mdl:gap-2 lg:gap-4 2xl:gap-8 4xl:gap-28', // gap
            'pl-0 lg:pl-4 xl:pl-0', // pl
            'pt-0 xs:pt-2 xl:pt-3', // pt
            // grid position
            'max-w-[20rem] xxs:max-w-full',
            'col-start-1 col-span-12',
            'xxs:col-start-5 xxs:col-span-8', // none
            'xs:col-start-1 xs:col-span-12', // xxs
            'sm:col-start-2 sm:col-span-11', // sm
            'md:col-start-3 md:col-span-10', // md
            'mdl:col-start-7 mdl:col-span-6', // mdl
            'xl:col-start-8 xl:col-span-5', // xl
            '4xl:col-span-6 4xl:col-start-7', // 4xl
            // "row-start-3 row-span-1",
            'row-start-2 row-span-1', // none
            'mdl:row-start-1 mdl:row-span-1', //mdl
            // children
            "[&>*]:w-full [&>*]:xxs:w-11/12 [&>*]:xs:w-5/12 [&>*]:sm:w-5/12 [&>*]:mdl:w-full [&>*]:4xl:w-4/12",
            "[&>*]:flex [&>*]:flex-row [&>*]:justify-end",
            "[&>*]:mdl:ml-2 [&>*]:lg:ml-0"
        )} >
            <div>
                <Text p weight='semibold' size='sm' className={twMerge('text-start sm:text-end', '')} degree="2">{t('intro.descriptions.1')}</Text>
            </div>
            <div>
                <Text p weight='semibold' size='sm' className={twMerge('text-start sm:text-end', 'w-full')} degree='2'>{t('intro.descriptions.2')}</Text>
            </div>
        </div>
        {/* button next */}
        <div className={twMerge(
            'mdl:w-2/12',
            'hidden xs:flex flex-col items-end mdl:items-start justify-end w-fit mdl:w-fit',
            'mt-1 lg:mt-4',
            'mb-0 xxs:mb-3 mdl:mb-0 lg:mb-4',
            'col-start-11 col-span-2',
            'mdl:col-span-2 mdl:col-start-1',
            'row-start-1 row-span-1',
            'mdl:row-start-2 mdl:row-span-1',
            'justify-self-end mdl:justify-self-start'
        )} >
            <ButtonNext />
        </div>
        <div className={twMerge(
            'hidden xs:flex',
            'row-start-3 row-span-1',
            'mdl:row-start-2 mdl:row-span-1',
            'col-start-1 col-span-3',
            'mdl:col-start-5 mdl:col-span-2',
            'xl:col-start-5 xl:col-span-2',
            'justify-self-end'
        )}>
            <FullStack className='hidden xxs:flex w-min' />
        </div>
        {/* DEVELOPER */}
        <div className={twMerge(
            'flex flex-col xxs:flex-row justify-start xs:justify-end',
            'row-start-4 row-span-1',
            'xxs:row-start-3 xxs:row-span-1',
            'mdl:row-start-2 mdl:row-span-1',
            'col-start-1 col-span-12',
            'xs:col-start-4 xs:col-span-9',
            'mdl:col-start-7 mdl:col-span-6', // xs
            'xl:col-start-7 xl:col-span-6', // xl
            'gap-2 sm:gap-1 md:gap-5 mdl:gap-8', // gap
            'justify-end mdl:justify-center items-end mdl:items-center'
            
        )}>
            <Fit weight='bold' degree='1' className={twMerge(DISPLAY_1_CLASS_NAME)}>{t('intro.title.3')}</Fit>
        </div>
    </>)
}

const menuItems = {
    "1": MENU_ITEMS.manifesto.link,
    "2": MENU_ITEMS.experience.link,
    "3": MENU_ITEMS.cases.link,
    "4": MENU_ITEMS.contact.link
} as const;
const menuKeys = ['manifesto', 'experience', 'cases', 'contact'];

type MenuItems = keyof typeof menuItems;
const Menu = () => {
    const { t } = useTranslation();

    return (<>
        <div className={twMerge('flex flex-row flex-wrap justify-between items-start w-full gap-y-6')} >
            {Array.apply(null, Array(4)).map((_, i) => {
                if (i > 3) return null;
                return <div key={i} className={twMerge('flex flex-col justify-start items-start gap-1 w-1/2 sm:w-auto md:w-1/4')} >
                    <Text p weight='medium' size='sm' degree='3'>{`0${i + 1}`}</Text>
                    <Link degree='1' size='sm' weight='semibold' href={menuItems[`${i + 1}` as MenuItems]} className='uppercase' >{t(`header.menu.${menuKeys[i]}.attribute`)}</Link>
                </div>
            })}
        </div>
        <Text p weight='medium' size='sm' degree='3' className={twMerge('w-max whitespace-nowrap-important', ' hidden xxs:flex sm:hidden md:flex')} >
            {t('intro.copy')}
        </Text>
    </>)
}

const Intro = () => {
    return (<>
        <div className={twMerge('pt-28 sm:pt-36 mdl:pt-40', 'flex flex-col gap-20 xs:gap-32 xl:gap-40')} >
            <div className={twMerge(
                'flex flex-row flex-wrap gap-y-8',
                'grid grid-cols-12 grid-row-4 xxs:grid-row-3 mdl:grid-row-2',
                'gap-x-4 gap-y-6 xxs:gap-y-8 xs:gap-y-6 sm:gap-y-8 lg:gap-y-10',
                'justify-items-stretch'
            )} >
                <Title />
            </div>
            <div className={twMerge('flex flex-row justify-between items-end', 'gap-0 xl:gap-6 4xl:gap-20')} >
                <Menu />
            </div>
        </div>
    </>)
}

export default Intro;