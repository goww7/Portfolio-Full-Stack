import { Head } from '@/components/common';
import { Suspense } from 'react';
import { Loading } from 'components/ui';
import { ContactPage } from '@/components/pages';

const Contact = () => {
    return (
        <>
            <Head title={"Mohamed Amine SAYAGH - Full Stack Web Developer"}
                description={"Mohamed Amine SAYAGH - Full Stack Web Developer"}
                keywords="Mohamed Amine SAYAGH - Full Stack Web Developer"
                author="Mohamed Amine SAYAGH"
                logo='/favicon.svg'
            />
            <Suspense fallback={<Loading />}>
                <ContactPage />
            </Suspense>
        </>
    )
}

export default Contact;
