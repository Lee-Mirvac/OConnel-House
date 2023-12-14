import { environment } from 'src/environments/environment';

export const API_PATH = {
  GET_BUILDING_DATA: '/object_1/records',
  GET_BUILDING_LEVEL: '/object_18/records',
  GET_BUILDING_VIEWS: '/object_17/records',
  GET_FLOOR_PLAN: '/object_19/records',
  GET_LOCATION: '/object_23/records',
  GET_GALLERY: '/object_24/records',
  GET_DISCLAIMER: '/object_27/records'
};

export const APIS = {
  msLogin: {
    msalLogin: '/v1/user/msLogin',
  },
  AUTH: {
    LOGIN: '/v1/user/login',
    LOGOUT: '/v1/user/logout',
    FORGOT_PASSWORD: '/v1/user/forgotPassword',
    VERIFY_TOKEN: '',
    SETUP_PASSWORD: '/v1/user/activateAccount',
    RESET_PASSWORD: '/v1/user/reset-password',
    CHANGE_PASSWORD: '/v1/user/changePassword',
    PROFILE_DETAILS: '',
    SEND_BROCHURE: '/v1/user/files',
    LINK: '/v1/file/link',
    GET_PROFILE: '/v1/user/profile',
  },
  AGENTS: {
    AGENT: '/v1/admin/agent',
    DELETE_AGENT: '/v1/admin/agent/delete',
    GET_AGENT: '/v1/admin/agent/list',
    GET_MENU: '/v1/admin/menu',
  },
  CLIENTS: {
    CLIENT: '/v1/client',
    DELETE_CLIENT: '/v1/client/delete',
    ADD_CLIENT: '/v1/client/add',
    UPDATE_CLIENT: '/v1/client/update',
    // GET_CLIENT_DETAILS: '/v1/client/list',
  },
  FILES: {
    FILE: '/v1/file',
  },
  ADMIN: {
    GET_STOCK_LIST: '/v1/admin/stocks/list',
    STOCK_LIST: '/v1/admin/stocks',
    GET_LOTS_LIST: '/v1/admin/lots',
    SEND_BROCHURE: '/v1/user/attachments'
  },
  PDF_FILES: '/v1/user/files',
  GET_PDF_BY_ID: '/v1/file/link',
  GET_IM: '/v1/infoMemorandum',
  GET_CLIENT: '/v1/client',
  REVOKE_URL: '/v1/revokeUrl',
};

export const USER_CONSTANTS = {
  USER_TYPES: {
    AGENT: 1,
    SUPER_ADMIN: 2,
    CLIENT: 3,
  },
};

export const PAGINATION = {
  limit: 10,
  page: 1,
};

export const REGEX = {
  EMAIL:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[A-Za-z\d\W]{8,}$/,
};


export const PAGE_ROUTES = {
  HOME: '/home',
  BACK_TO_LOGIN: '/login',
  FLOORPLAN: '/apartments/floorplan',
  DESTINATION: '/destination/precinct',
  LOGIN: 'login',
  PLACE: 'place',
  VISION: '/destination/vision',
  PRECINCT_MAP: '/destination/map',
  TOWER: 'tower',
  TECHNOLOGY: 'technology',
  SUSTAINABILITY: '/sustainability',
  DOCUMENTS: '/documents',
  GALLERY: '/gallery',
  TEAM: '/team',
  FLOOR_PLANS: '/tower/view-line/plans',
  RENDERS: '/tower/view-line/renders',
  VIEW_LINE: '/tower/view-line',
  FLOOR_PLAN: '/tower/floorplan',
  INTRODUCTION: '/tower/introduction',
  AGENT_MANAGEMENT: '/admin/agent-management',
  AGENT_PERMISSION: '/agent/custom-presentation',
  AGENTS: '/admin/agent-management',
  AGENT_CLIENT_ACTIVITY: '/agent/client-management/id',
  STOCK_ALLOCATION: '/admin/stock-allocation'
};

export const HEADER = {
  NAV_HEADING:{title:"O'CONNELL HOUSE",path:'/'},
  LIST_VIEW: [
    {
      path: '/apartments',
      title: 'Apartments',
      src: '',
      link: '',
      id: 'apartments',
      sub_menu: [
        {
          path: '/apartments/model',
          title: '3D Model',
          src: '',
          link: '',
        },
        {
          path: '/apartments/floorplan',
          title: 'Floorplans',
          src: '',
          link: '',
        },
        {
          path: '/apartments/floor-plate',
          title: 'Floorplates',
          src: '',
          link: '',
        },
        {
          path: '/apartments/views',
          title: 'Views',
          src: '',
          link: '',
        },
      ],
    },
    {
      path: '/location',
      title: 'Location',
      src: '',
      link: '',
      id: 'location',
    },
    {
      path: '/masterplan',
      title: 'MASTERPLAN',
      src: '',
      link: '',
      id: 'masterplan',
    },
    {
      path: '/amenity',
      title: 'Amenity',
      src: '',
      link: '',
      id: 'amenity',
      sub_menu: [
        {
          path: '/amenity/ground_level_2',
          title: 'Ground Level + Level 2',
          src: '',
          link: '',
        },
        {
          path: '/amenity/rooftop',
          title: 'Rooftop',
          src: '',
          link: '',
        },
      ],
    },
    {
      path: '/gallery',
      title: 'Gallery',
      src: '',
      link: '',
      id: 'gallery',
      sub_menu: [
        {
          path: '/gallery/all',
          title: 'All',
          src: '',
          link: '',
        },
        {
          path: '/gallery/exterior',
          title: 'Exterior & Amenity',
          src: '',
          link: '',
        },
        {
          path: '/gallery/residences',
          title: 'Residences',
          src: '',
          link: '',
        },
        {
          path: '/gallery/pavilions',
          title: 'Pavilions',
          src: '',
          link: '',
        },
        {
          path: '/gallery/villas',
          title: 'Villas',
          src: '',
          link: '',
        },
      ],
    },
    {
      path: '/video',
      title: 'Video',
      src: '',
      link: '',
      id: 'video'
    },
    {
      path: '/admin',
      title: 'Admin',
      src: '',
      link: '',
      isDisplay: false,
      id: 'admin',
      sub_menu: [
        {
          path: '/admin/agent-management',
          title: 'Manage Agents',
          src: '',
          link: '',
        },
        {
          path: '/admin/stock-allocation',
          title: 'Allocate Stock',
          src: '',
          link: '',
        },
        {
          path: '/admin/email',
          title: 'Email',
          src: '',
          link: '',
        },
      ],
    },
   
  ],
  LIST_MIRVAC:  [
    {
      path: '/apartments',
      title: 'Apartments',
      src: '',
      link: '',
      isDisplay: true,
      id: 'apartments',
      sub_menu: [
        {
          path: '/apartments/model',
          title: '3D Model',
          src: '',
          link: '',
        },
        {
          path: '/apartments/floorplan',
          title: 'Floorplans',
          src: '',
          link: '',
        },
        {
          path: '/apartments/floor-plate',
          title: 'Floorplates',
          src: '',
          link: '',
        },
        {
          path: '/apartments/views',
          title: 'Views',
          src: '',
          link: '',
        },
      ],
    },
    {
      path: '/location',
      title: 'Location',
      src: '',
      link: '',
      isDisplay: true,
      id: 'location',
    },
    {
      path: '/masterplan',
      title: 'MASTERPLAN',
      src: '',
      link: '',
      id: 'masterplan',
      isDisplay: true,
      sub_menu: [
        {
          path: '/masterplan/aerial',
          title: 'Aerial',
          src: '',
          link: '',
        },
        {
          path: '/masterplan/masterplan',
          title: 'Masterplan',
          src: '',
          link: '',
        },
      ],
    },
    // {
    //   path: '/finishes-selector',
    //   title: 'Finishes selector',
    //   src: '',
    //   link: '',
    //   id: '',
    // },
    {
      path: '/gallery',
      title: 'Gallery',
      src: '',
      link: '',
      isDisplay: true,
      id: 'gallery',
      sub_menu: [
        {
          path: '/gallery/all',
          title: 'All',
          src: '',
          link: '',
        },
        {
          path: '/gallery/exterior',
          title: 'Exterior & Amenity',
          src: '',
          link: '',
        },
        // {
        //   path: '/gallery/amenity',
        //   title: 'Amenity',
        //   src: '',
        //   link: '',
        // },
        {
          path: '/gallery/residences',
          title: 'Residences',
          src: '',
          link: '',
        },
        {
          path: '/gallery/pavilions',
          title: 'Pavilions',
          src: '',
          link: '',
        },
        {
          path: '/gallery/penthouses',
          title: 'Penthouses',
          src: '',
          link: '',
        },


        // {
        //   path: '/gallery/video',
        //   title: 'Video',
        //   src: '',
        //   link: '',
        // },
      ],
    },
    {
      path: '/amenity',
      title: 'Amenity',
      src: '',
      link: '',
      isDisplay: true,
      id: 'amenity',
      sub_menu: [
        {
          path: '/amenity/rooftop',
          title: 'Rooftop',
          src: '',
          link: '',
        },
        {
          path: '/amenity/lounge',
          title: 'Isle Lounge',
          src: '',
          link: '',
        },
        {
          path: '/amenity/gym',
          title: 'Gym',
          src: '',
          link: '',
        },
        {
          path: '/amenity/ground',
          title: 'Ground',
          src: '',
          link: '',
        },
      ],
    },
    {
      path: '/admin',
      title: 'Admin',
      src: '',
      link: '',
      isDisplay: false,
      id: 'admin',
      sub_menu: [
        {
          path: '/admin/agent-management',
          title: 'Manage Agents',
          src: '',
          link: '',
        },
        {
          path: '/admin/stock-allocation',
          title: 'Allocate Stock',
          src: '',
          link: '',
        },
        {
          path: '/admin/email',
          title: 'Email',
          src: '',
          link: '',
        },
      ],
    },
    {
      path: '/agent',
      title: 'Agent',
      src: '',
      link: '',
      isDisplay: false,
      id: 'agent',
      sub_menu: [
        // {
        //   path: '/agent/presentation',
        //   title: 'Personalise Presentation',
        //   src: '',
        //   link: '',
        // },
        {
          path: '/agent/email',
          title: 'Email',
          src: '',
          link: '',
        },
      ],
    },
    // {
    //   path: '/mirvac',
    //   title: 'Mirvac',
    //   src: '',
    //   link: '',
    //   id: 'mirvac',
    //   sub_menu: [
    //     {
    //       path: '/mirvac/history',
    //       title: 'History',
    //       src: '',
    //       link: '',
    //     },
    //     {
    //       path: '/mirvac/news',
    //       title: 'Mirvac Newstead History',
    //       src: '',
    //       link: '',
    //     },
    //     {
    //       path: '/mirvac/quality',
    //       title: 'Quality & Care',
    //       src: '',
    //       link: '',
    //     },
    //     {
    //       path: '/mirvac/awards',
    //       title: 'Awards',
    //       src: '',
    //       link: '',
    //     },
    //   ],
    // },
  ],
};

export const LOCATION = {
  IMAGE_URL:'assets/images/splash/location.png',
  ID: {
    PARKS: 0,
    EAT: 1,
    LIFE_STYLE: 2,
    BEAUTY: 3,
    TRANSPORT: 4,
    EDUCATION: 5,
  },
  SIDE_MENU: [
    {
      id: 'ParksRiverwalk',
      src: 'assets/img/icons/park-icon.svg',
      title: 'PARKS <br/> & RIVERWALK',
      path: 'PARKS',
    },
    {
      id: 'EatDrink',
      src: 'assets/img/icons/eat-icon.svg',
      title: 'EAT<br/> & DRINK',
      path: 'Eat',
    },
    // {
    //   id: 'food',
    //   src: 'assets/img/icons/food-icon.svg',
    //   title: 'FRESH FOOD<br/> & MARKETS',
    // },
    {
      id: 'retailLifestyle',
      src: 'assets/img/icons/lifestyle-icon.svg',
      title: 'LIFESTYLE<br/> & DESIGN',
      path: 'Lifestyle',
    },
    {
      id: 'BeautyWellbeing',
      src: 'assets/img/icons/beauty-icon.svg',
      title: 'BEAUTY<br/> & WELLBEING',
      path: 'Beauty',
    },
    // {
    //   id: 'health',
    //   src: 'assets/img/icons/health-icon.svg',
    //   title: 'HEALTH<br/> & FITNESS',
    // },
    {
      id: 'Transports',
      src: 'assets/img/icons/transport-icon.svg',
      title: 'TRANSPORT',
      path: 'Transports',
    },
    {
      id: 'Education',
      src: 'assets/img/icons/education-icon.svg',
      title: 'EDUCATION',
      path: 'Education',
    },
  ],
  LOCATION_SIDEBAR: [
    {
      id: '',
      class: 'main_map',
      src: '/assets/img/location/location.jpg',
      alt: 'Map',
    },
    {
      id: 'beauty',
      class: '',
      src: '/assets/img/location/Map_Beauty.png',
      alt: 'map beauty',
    },
    {
      id: 'eat',
      class: '',
      src: '/assets/img/location/Map_Eat.png',
      alt: 'Map Eat.png',
    },
    {
      id: 'education',
      class: '',
      src: '/assets/img/location/Map_Education.png',
      alt: 'Map Education',
    },
    {
      id: 'food',
      class: '',
      src: '/assets/img/location/Map_FreshFood.png',
      alt: 'Map FreshFood',
    },
    {
      id: 'health',
      class: '',
      src: '/assets/img/location/Map_Health.png',
      alt: 'Map Health',
    },
    {
      id: 'lifestyle',
      class: '',
      src: '/assets/img/location/Map_Lifestyle.png',
      alt: 'Map Lifestyle',
    },
    {
      id: 'park',
      class: '',
      src: '/assets/img/location/Map_Park.png',
      alt: 'Map Park',
    },
    {
      id: 'transport',
      class: '',
      src: '/assets/img/location/Map_Transport.png',
      alt: 'Map Transport',
    },
  ],
};
export const MASTERPLAN = {
  IMAGE_URL:'/assets/images/splash/masterplan.png',
  SIDE_MENU: [
    {
      id: 'pier',
      title: 'PIER',
    },
    {
      id: 'park',
      title: 'PARK',
    },
    {
      id: 'unison',
      title: 'UNISON',
    },
    {
      id: 'quay',
      title: 'QUAY',
    },
    {
      id: 'liv',
      title: 'LIV ANURA',
    },
    // {
    //   id: 'isle',
    //   title: 'ISLE',
    // },
  ],
  MASTERPLAN_SIDEBAR: [
    {
      id: '',
      class: 'main_map',
      src: '/assets/img/aerial/Masterplan.jpg',
      alt: 'Aerial',
    },
    {
      id: 'pier',
      class: '',
      src: '/assets/img/aerial/pier.png',
      alt: 'Pier',
    },
    // {
    //   id: 'isle',
    //   class: '',
    //   src: '/assets/img/aerial/isle.png',
    //   alt: 'Isle',
    // },
    {
      id: 'liv',
      class: '',
      src: '/assets/img/aerial/Liv.png',
      alt: 'Liv',
    },
    {
      id: 'park',
      class: '',
      src: '/assets/img/aerial/park.png',
      alt: 'Park',
    },
    {
      id: 'quay',
      class: '',
      src: '/assets/img/aerial/quay.png',
      alt: 'Quay',
    },
    {
      id: 'unison',
      class: '',
      src: '/assets/img/aerial/Unison.png',
      alt: 'Unison',
    },
  ],
};

export const MIRVAC = {
  AWARD_LIST: [
    {
      src: 'assets/img/icons/award1.svg',
    },
    {
      src: 'assets/img/icons/award2.svg',
    },
    {
      src: 'assets/img/icons/award3.svg',
    },
    {
      src: 'assets/img/icons/award4.svg',
    },
  ],
};

export const AMENITY = {
  ROOF_TOP_IMAGE_URL:'assets/img/amenity/rooftop.png',
  GROUND_LEVEL:'assets/img/amenity/ground.png',
  ROOF_TOP_IMAGE: 'assets/img/amenity.jpg',
  ROOF_TOP_SIDEBAR: [
    { id: 'bbq', title: 'BBQ Bench' },
    { id: 'seatingPods', title: 'Seating Pods' },
    { id: 'waterfall', title: 'Waterfall Beds' },
    { id: 'sunbeds', title: 'Sunbeds' },
    { id: 'yoga', title: 'Yoga Lawn' },
    { id: 'spas', title: 'Spas' },
    { id: 'wellness', title: 'Wellness Space' },
    { id: 'wet', title: 'Wet Edge' },
    { id: 'catch', title: 'Catch Pool' },
    { id: 'dayBed', title: 'Day Bed' },
    { id: 'outdoorShower', title: 'Outdoor Shower' },
    { id: 'maintainPath', title: 'Maintenance Path' },
    { id: 'outdoorDining', title: 'Outdoor Dining' },
  ],

  ROOFTOP_SIDEBAR: [
    {
      id: '',
      class: 'main_map',
      src: '/assets/img/amenity/main_image.png',
      alt: 'Rooftop',
    },
    {
      id: 'bbq',
      class: '',
      src: '/assets/img/amenity/dots1.png',
      alt: 'BBQ',
    },
    {
      id: 'seatingPods',
      class: '',
      src: '/assets/img/amenity/dots2.png',
      alt: 'Isle',
    },
    {
      id: 'waterfall',
      class: '',
      src: '/assets/img/amenity/dots3.png',
      alt: 'Liv',
    },
    {
      id: 'sunbeds',
      class: '',
      src: '/assets/img/amenity/dots4.png',
      alt: 'Sunbeds',
    },
    {
      id: 'yoga',
      class: '',
      src: '/assets/img/amenity/dots5.png',
      alt: 'Yoga',
    },
    {
      id: 'spas',
      class: '',
      src: '/assets/img/amenity/dots6.png',
    },
    {
      id: 'wellness',
      class: '',
      src: '/assets/img/amenity/dots7.png',
    },
    {
      id: 'wet',
      class: '',
      src: '/assets/img/amenity/dots8.png',
    },
    {
      id: 'catch',
      class: '',
      src: '/assets/img/amenity/dots9.png',
    },
    {
      id: 'dayBed',
      class: '',
      src: '/assets/img/amenity/dots10.png',
    },
    {
      id: 'outdoorShower',
      class: '',
      src: '/assets/img/amenity/dots11.png',
    },
    {
      id: 'maintainPath',
      class: '',
      src: '/assets/img/amenity/dots12.png',
    },
    {
      id: 'outdoorDining',
      class: '',
      src: '/assets/img/amenity/dots13.png',
    },
  ],
  PLAY_IMG: 'assets/img/icons/play.svg',
  PAUSE_IMG: 'assets/img/icons/pause.svg',
  REPLAY_IMG: 'assets/img/icons/replay.svg',
  VIDEO: 'assets/video/home.mp4',
};

export const COMMON = {
  TEXT: "Artist's impression. Indicative only and subject to change without notification",
};

export const APARTMENT = {
  TYPES: [
    {
      value: 'Charlton Villa 1',
      src: 'assets/apartments/floorplan/chartonvilla1.jpg',
    },
    {
      value: 'Charlton Villa 2',
      src: 'assets/apartments/floorplan/30102.jpg',
    },
    {
      value: 'Charlton Villa 3',
      src: 'assets/apartments/floorplan/30103.jpg',
    },
    {
      value: 'Charlton Villa 4',
      src: 'assets/apartments/floorplan/30104.jpg',
    },
    {
      value: 'Charlton Residences Type 1',
      src: 'assets/apartments/floorplan/Charlton_Residences_1.jpg',
    },
    {
      value: 'Charlton Residences Type 2',
      src: 'assets/apartments/floorplan/Charlton_Residences_2.jpg',
    },
    {
      value: 'Charlton Residences Type 3',
      src: 'assets/apartments/floorplan/Charlton_Residences_3.jpg',
    },
    {
      value: 'Charlton Residences Type 4',
      src: 'assets/apartments/floorplan/Charlton_Residences_4.jpg',
    },
    {
      value: 'Charlton Residences Type 5 - Level 2',
      src: 'assets/apartments/floorplan/Charlton_Residences_5_L2.jpg',
    },
    {
      value: 'Charlton Residences Type 5',
      src: 'assets/apartments/floorplan/Charlton_Residences_5.jpg',
    },
    {
      value: 'Charlton Residences Type 6',
      src: 'assets/apartments/floorplan/Charlton_Residences_6.jpg',
    },
    {
      value: 'Charlton Residences Type 7',
      src: 'assets/apartments/floorplan/Charlton_Residences_7.jpg',
    },
    {
      value: 'Charlton Residences Type 8',
      src: 'assets/apartments/floorplan/Charlton_Residences_8.jpg',
    },
    {
      value: 'Charlton Residences Type 9',
      src: 'assets/apartments/floorplan/Charlton_Residences_9.jpg',
    },
    {
      value: 'Charlton Residences Type 10',
      src: 'assets/apartments/floorplan/Charlton_Residences_10.jpg',
    },
    {
      value: 'Charlton Residences Type 11',
      src: 'assets/apartments/floorplan/Charlton_Residences_11.jpg',
    },
    {
      value: 'Charlton Pavilion Type 1',
      src: 'assets/apartments/floorplan/Charlton_Pavilions_1.jpg',
    },
    {
      value: 'Charlton Pavilion Type 2',
      src: 'assets/apartments/floorplan/Charlton_Pavilions_2.jpg',
    },
    {
      value: 'Charlton Pavilion Type 3',
      src: 'assets/apartments/floorplan/Charlton_Pavilions_3.jpg',
    },
    {
      value: 'Charlton Pavilion Type 4',
      src: 'assets/apartments/floorplan/Charlton_Pavilions_4.jpg',
    },
    {
      value: 'Charlton Pavilion Type 5',
      src: 'assets/apartments/floorplan/Charlton_Pavilions_5.jpg',
    },
    {
      value: 'Charlton Pavilion Type 6',
      src: 'assets/apartments/floorplan/Charlton_Pavilions_6.jpg',
    },
  ],
};

export const AERIAL = {
  SIDE_MENU: [
    {
      id: 'pier',
      title: 'PIER',
    },
    {
      id: 'park',
      title: 'PARK',
    },
    {
      id: 'unison',
      title: 'UNISON',
    },
    {
      id: 'quay',
      title: 'QUAY',
    },
    {
      id: 'liv',
      title: 'LIV ANURA',
    },
    {
      id: 'isle',
      title: 'ISLE',
    },
  ],
  AERIAL_SIDEBAR: [
    {
      id: '',
      class: 'main_map',
      src: '/assets/img/aerial/Aerial.jpg',
      alt: 'Aerial',
    },
    {
      id: 'pier',
      class: '',
      src: '/assets/img/aerial/pier.png',
      alt: 'Pier',
    },
    {
      id: 'isle',
      class: '',
      src: '/assets/img/aerial/isle.png',
      alt: 'Isle',
    },
    {
      id: 'liv',
      class: '',
      src: '/assets/img/aerial/Liv.png',
      alt: 'Liv',
    },
    {
      id: 'park',
      class: '',
      src: '/assets/img/aerial/park.png',
      alt: 'Park',
    },
    {
      id: 'quay',
      class: '',
      src: '/assets/img/aerial/quay.png',
      alt: 'Quay',
    },
    {
      id: 'unison',
      class: '',
      src: '/assets/img/aerial/unison.png',
      alt: 'Unison',
    },
  ],
};


export const HOME={
  IMAGE_URL:'assets/images/splash/home.png',
  OVERLAY_TEXT:"O'CONNELL HOUSE"
}

export const MAIN={
  IMAGE_URL:'assets/images/splash/main.jpg',
  OVERLAY_TEXT:"",
  BUTTONS:[
    {title:"Enter",path:'/apartments'},
    // {title:'CHARLTON HOUSE',path:''}
  ]
}

export const VIDEO={
  VIDEO_URL:'assets/video/home.mp4'
}


export const ROUTE_DEFINATION={

  APP_ROUTING:{
    MAIN:'',
    HOME:'home',
    APARTMENTS:'apartments',
    LOCATION:'location',
    MASTERPLAN:'masterplan',
    GALLERY:'gallery',
    AMENITY:'amenity',
    VIDEO:'video'

  },
  AMENITY_ROUTING:{
    ROOF_TOP:'rooftop',
    GROUND_LEVEL_2:'ground_level_2'
  }

} 