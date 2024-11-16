import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const MainHeader: React.FC = function () {

    const location = useLocation()
    const hideHeader = location.pathname === '/calcurlator'
    return (
        <>
            {!hideHeader &&
                <header className="sticky top-0 z-50 bg-color-custom h-[72px] flex items-center justify-center border-l-2" >
                    <div className='relative flex size-full flex-col items-center '>
                        <div className='absolute top-0 size-full'>
                            <div className='size-full border-b border-neutral-300'>
                                <div className='flex h-full items-center mx-auto px-6 md:px-8 lg:max-w-[1216px] lg:px-0'> {/* Căn chỉnh giữa */}
                                    <a href="/" className='font-bold App-logo flex-shrink-0 overflow-hidden transition-[max-width] duration-300 xl:me-8 me-4 max-w-full md:me-7'>🥠grphCenter</a>
                                    <form action="" className='w-full'>
                                        <div className='flex grow items-center lg:gap-7 xl:gap-8'>
                                            <div className='flex gap-7 xl:-order-2 xl:gap-8'>
                                                <button type='button' className='hidden items-center gap-1 text-neutral-900 hover:text-purple focus-visible:text-purple xl:flex'>
                                                    <span className='text-[14px] leading-[20px] tracking-[0.14px] md:text-[16px] md:leading-[24px] md:tracking-normal'>option1</span>
                                                    <svg className="fill-current size-6" aria-hidden="true" viewBox="0 0 24 24"><path d="M7,10L12,15L17,10H7Z"></path></svg>
                                                </button>
                                                <button type="button" id="calculatorsDropdownButtonDesktop" role="tab" aria-selected="false" aria-controls="calculatorsDropdownDesktop" className="hidden items-center gap-1 text-neutral-900 hover:text-purple focus-visible:text-purple xl:flex">
                                                    <span className="text-[14px] leading-[20px] tracking-[0.14px] md:text-[16px] md:leading-[24px] md:tracking-normal">option2</span>
                                                    <svg className="fill-current size-6" aria-hidden="true" viewBox="0 0 24 24"><path d="M7,10L12,15L17,10H7Z"></path></svg>
                                                </button>
                                            </div>
                                            <div className="hidden items-center gap-4 md:flex md:flex-row">
                                                <NavLink to="/calcurlator">
                                                    <button type="button" className="base-Button-root min-w-[4rem] min-h-[2.25rem] relative overflow-hidden inline-flex flex-grow justify-center items-center rounded-full whitespace-nowrap font-semibold transition-colors duration-300 outline-none cursor-pointer px-[19px] py-[11px] bg-transparent border text-purple border-purple hover:bg-purple-100 hover:border-purple-500 hover:text-purple-500 active:bg-purple-100 active:border-purple-700 active:text-purple-700 focus-visible:px-[17px] focus-visible:py-[9px] focus-visible:m-[3px] focus-visible:border-none focus-visible:bg-purple-100 focus-visible:text-purple-500 focus-visible:ring-2 ring-offset-[3px] ring-purple-800 bg-white">create
                                                    </button>
                                                </NavLink>
                                                <button type="button" className="base-Button-root min-w-[4rem] min-h-[2.25rem] relative overflow-hidden inline-flex flex-grow justify-center items-center rounded-full whitespace-nowrap font-semibold transition-colors duration-300 outline-none cursor-pointer px-5 py-3 bg-white text-purple hover:text-purple-500 hover:border-purple-100 active:text-purple-700 focus-visible:px-[17px] focus-visible:py-[9px] focus-visible:m-[3px] focus-visible:border-none focus-visible:text-purple-500 focus-visible:ring-2 ring-offset-[3px] ring-purple-800 hover:bg-inherit focus-visible:bg-inherit active:bg-inherit md:hover:bg-purple-100 md:focus-visible:bg-purple-100 md:active:bg-purple-100">sign in</button>
                                            </div>
                                            <div className="w-6 transition-[width,flex-grow] duration-300 md:w-60 md:pe-4 -order-1 ms-auto xs:block md:me-auto md:ms-0 md:flex lg:flex"><div className="flex w-full cursor-text items-center gap-x-0 overflow-clip rounded-3xl border bg-white transition-[border-color] duration-150 md:gap-x-2 md:hover:border-purple-600 border-transparent md:border-neutral-500"><div className="ms-0 flex h-full w-6 shrink-0 items-center justify-center transition-margin duration-300 md:ms-4"><svg className="size-full transition-[fill] duration-300 fill-neutral-700" aria-hidden="true" viewBox="0 0 24 24"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"></path></svg>
                                            </div>
                                                <div className="relative flex w-full overflow-hidden"><input type="text" className="peer/search-input right-0 z-10 order-2 ms-0 overflow-clip bg-transparent py-3 text-sm leading-5 tracking-[0.14px] outline-none transition-[padding,width] duration-300 md:w-full md:pe-3 browser-default w-0" name="search_input" value="" />
                                                    <span className="absolute left-0 top-0 py-3 text-sm leading-5 text-neutral-700 transition-transform delay-200 duration-300 invisible translate-y-7 md:visible md:translate-y-0">search</span>
                                                </div></div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            }
        </>
    );
}

export default MainHeader