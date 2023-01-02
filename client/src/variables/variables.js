import { MyConstVariable } from "./MyConstVaeiable";

export const MyVariable = {
    hostName: 'http://localhost:3000',

    MenuData: [
        {
            title: 'Trang Chủ',
            image: '',
            path: '/',
            active: 'false',
            defaultState: {
                name: 'stateName',
                value: MyConstVariable.myNullVariable
            }
        }, {
            title: "Sách",
            image: "",
            path: '/books',
            active: 'false',
            defaultState: {
                name: 'searchValue',
                value: MyConstVariable.myNullVariable
            }
        },
        {
            title: "Giỏ Hàng",
            image: "",
            path: '/cart',
            active: 'false',
            defaultState: {
                name: 'stateName',
                value: MyConstVariable.myNullVariable
            }
        },
        {
            title: "Liên Hệ",
            image: "",
            path: '/contactus',
            active: 'false',
            defaultState: {
                name: 'stateName',
                value: MyConstVariable.myNullVariable
            }
        }
    ],
    PlacseHolderForSearchBar: 'Tìm tên sách, tác giả ...',
    Banners: [
        // {
        //     title: 'Banner 0',
        //     url: '/assets/banners/banner0.png',
        //     backColor: 'var(--White)'
        // },
        {
            title: 'Banner 1',
            url: '/assets/banners/banner01-white.gif',
            backColor: 'var(--White)'
        },
        {
            title: 'Banner 2',
            url: '/assets/banners/banner2-white.gif',
            backColor: 'var(--White)'
        },
        {
            title: 'Banner 3',
            url: '/assets/banners/banner03-white.gif',
            backColor: 'var(--White)'
        },
        {
            title: 'Banner 4',
            url: '/assets/banners/banner04.gif',
            backColor: 'var(--White)'
        },
    ],
    VerticalBanners: [
        {
            url: '/assets/banners/adv1.jpg',
            order: 1
        },
        {
            url: '/assets/banners/adv2.jpg',
            order: 2
        },
        {
            url: '/assets/banners/adv3.jpg',
            order: 3
        },
        {
            url: '/assets/banners/adv1.jpg',
            order: 4
        },
    ],
    FooterData: {
        description: 'Website cung cấp sách hàng đầu Việt Nam',
        contactUs: {
            title: 'Liên hệ chúng tôi tại',
            phoneNumber: '0911 111 205',
            address: '01 Phù Đổng Thiên Vương - Phường 8 - Đà Lạt',
            email: 'toimuasach@gmail.com',
            social: [
                {
                    path: '/',
                    image: '/assets/icons/ic-social-facebook.png'
                },
                {
                    path: '/',
                    image: '/assets/icons/ic-social-youtube.png'
                },
                {
                    path: '/',
                    image: '/assets/icons/ic-social-twitter.png'
                }]
        },
        cutomerHelper: {
            title: 'Hổ trợ khách hàng'
        }
    },
    BookTopics: [
        'Tìm kiếm nhiều nhất', 'Bán chạy nhất', 'Liên quan'
    ],
    BookDetailTitle: {
        mainTitle: 'Đánh giá',
        toRatingTitle: 'Xếp hạng tựa sách này',
        toRatingGuid: 'Cho người khác biết suy nghĩ của bạn',
        reviewedTitle: 'Những bài đánh giá khác'
    },
    ToRatingButtons: [
        { active: 'false', inactiveImage: '/assets/icons/ic-none-star.png', activeImage: '/assets/icons/ic-active-star.png', order: 1 },
        { active: 'false', inactiveImage: '/assets/icons/ic-none-star.png', activeImage: '/assets/icons/ic-active-star.png', order: 2 },
        { active: 'false', inactiveImage: '/assets/icons/ic-none-star.png', activeImage: '/assets/icons/ic-active-star.png', order: 3 },
        { active: 'false', inactiveImage: '/assets/icons/ic-none-star.png', activeImage: '/assets/icons/ic-active-star.png', order: 4 },
        { active: 'false', inactiveImage: '/assets/icons/ic-none-star.png', activeImage: '/assets/icons/ic-active-star.png', order: 5 },
    ],
    YourCart: {
        title: 'Giỏ hàng của bạn',
    },
    booksToolbar: [
        {
            title: 'Phổ biến',
            active: true,
            id: 1,
            constant: 'popular'
        },
        {
            title: 'Bán chạy',
            active: false,
            id: 2,
            constant: 'best-seller'
        },
        {
            title: 'Hàng mới',
            active: false,
            id: 3,
            constant: 'newest'
        },
        {
            title: 'Giá thấp đến cao',
            active: false,
            id: 4,
            constant: 'low-to-high'
        },
        {
            title: 'Giá cao đến thấp',
            active: false,
            id: 5,
            constant: 'high-to-low'
        },
        {
            title: 'Giá',
            active: false,
            id: 6,
            constant: 'best-seller'
        }
    ]
}