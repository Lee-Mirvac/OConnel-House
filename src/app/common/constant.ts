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
    imageUrl:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    button:{title:navbarOptions?.navTitle?.title,route:appRoutes?.navMenu}
}

export const amenityPageConstants={
    buttons:[
                {title:'GROUND & LEVEL2'},
                {title:'ROOFTOP'}
            ]
}

export const locationPageConstants={
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png"
}