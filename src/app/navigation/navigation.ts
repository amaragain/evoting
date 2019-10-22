import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [{
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            
            {
                id: 'election',
                title: 'Election',
                translate: 'NAV.ECOMMERCE',
                type: 'collapsable',
                icon: 'thumbs_up_down',
                children: [{
                        id: 'Election',
                        title: 'Election',
                        type: 'item',
                    url: '/apps/election/election-list',
                        
                    }
                    
                ]
            },
             
        ]
    }
];