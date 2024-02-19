import { useState } from 'react';
import TopNavigation from '@/Components/Navigation/TopNavigation';
import SideNavigation from '@/Components/Navigation/SideNavigation';
import Footer from '@/Components/Footer';
import { usePage } from '@inertiajs/react';

export default function Authenticated({ user, children }) {
    const [isShowMenu, setIsShowMenue] = useState(true)

    return (
        <div className="min-h-screen bg-sla te-100/90">
            <TopNavigation auth={user} onClickMenu={() => setIsShowMenue(!isShowMenu)} />

            <main className="h-screen flex">
                <SideNavigation auth={user} showSideBar={isShowMenu} />
                
                <div className='h-[calc(100vh-4rem)] mt-16 w-full flex flex-col overflow-y-auto'>
                    
                    <div className='grow p-5 w-full mb-10'>
                        {children}
                    </div>

                    <Footer />
                </div>
            </main>
        </div>
    );
}
