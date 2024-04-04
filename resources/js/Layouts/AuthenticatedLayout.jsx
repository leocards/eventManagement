import { useEffect, useState } from 'react';
import TopNavigation from '@/Components/Navigation/TopNavigation';
import Side from '@/Components/Navigation/Side';
import Footer from '@/Components/Footer';
import { usePage } from '@inertiajs/react';
import { useDispatch, useSelector } from "react-redux";
import { listenToWindowSize } from '@/Store/windowSize';
import { toggleMenu } from '@/Store/menuToggle';


export default function Authenticated({ user, children }) {
    const dispatch = useDispatch();
    const showMenu = useSelector((state) => state.menuToggle.showMenu)
    const windowSize = useSelector((state) => state.windowWidth.size)

    useEffect(() => {
        dispatch(listenToWindowSize())
    }, [])

    useEffect(() => {
        if(windowSize < 1024) {
            dispatch(toggleMenu(false))
        } else {
            dispatch(toggleMenu(true))
        }
    }, [windowSize])

    return (
        <div className="min-h-screen bg-sla te-100/90">
            <TopNavigation auth={user} onClickMenu={() => dispatch(toggleMenu(!showMenu))} showMenu={showMenu} />

            <main className="h-screen flex">
                
                <Side auth={user} showSideBar={showMenu} />
                
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
{/* <SideNavigation auth={user} showSideBar={showMenu} /> */}