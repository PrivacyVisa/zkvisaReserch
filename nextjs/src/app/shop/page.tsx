"use client"
import React, { useState } from 'react'

import MainShopContainer from '@/Components/Shop/MainContainer'

export default function page() {    
    return ( 
        <section className='flex py-[5vh] px-[5vw]'>
            <MainShopContainer/>
        </section>
    )
}