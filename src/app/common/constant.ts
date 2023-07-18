export const  appRoutes={
home:'',
navMenu:'menu',
location:'location',
masterPlan:'master-plan',
amenity:'amenity',
gallery:'gallery',
video:'video',
apartment:'apartment'
}
export const appParentRoutes={
    navigatePages:'view'
}

export const navbarOptions={
    navTitle:{title:"O'CONNELL HOUSE",path:appRoutes.home},
    navPages:[
        {title:'APARTMENTS',path:appRoutes.apartment},
        {title:'LOCATION',path:appRoutes.location},
        {title:'MASTERPLAN',path:appRoutes.masterPlan},
        {title:'AMENITY',path:appRoutes.amenity},
        {title:'GALLERY',path:appRoutes.gallery},
        {title:'VIDEO',path:appRoutes.video},
    ]
}

export const homePageConstants={
    imageUrl:'../../assets/_L5A7002-01 1.jpg',
    imageOverlayText:'ascott green',
    button:{title:navbarOptions?.navTitle?.title,route:appRoutes?.navMenu}
}


export const menuPageConstants={
    imageUrl:'../../assets/_L5A6709-01 1.png',
    imageOverlayText:"O'CONNELL HOUSE",
}

export const amenityPageConstants={
    buttons:[
                {title:'GROUND & LEVEL2'},
                {title:'ROOFTOP'}
            ]
}

export const locationPageConstants={
    imageUrl:'../../assets/image 2.png'
}

export const masterPlanPageConstants={
    imageUrl:'../../assets/image 3.png'
}