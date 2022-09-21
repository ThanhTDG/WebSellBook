export const MyVariable = {
    hostName: 'http://localhost:3000',
    MenuData: [
        {
            title: 'Trang Chủ',
            image: '',
            path: '/',
            active: 'false'
        }, {
            title: "Sách",
            image: "",
            path: '/books',
            active: 'false'
        },
        {
            title: "Giỏ Hàng",
            image: "",
            path: '/cart',
            active: 'false'
        },
        {
            title: "Liên Hệ",
            image: "",
            path: '/contactus',
            active: 'false'
        }
    ],
    PlacseHolderForSearchBar: 'Tìm tên sách, tác giả ...',
    Banners: [
        {
            title: 'Banner 0',
            url: '/assets/banners/banner0.png',
            backColor: 'var(--White)'
        },
        {
            title: 'Banner 1',
            url: '/assets/banners/banner1.gif',
            backColor: 'var(--LightOrange)'
        },
        {
            title: 'Banner 2',
            url: '/assets/banners/banner2.gif',
            backColor: 'var(--LightOrange)'
        },
    ],
    FooterData: {
        description: 'Website cung cấp sách hàng đầu Việt Nam',
        contactUs: {
            title: 'Liên hệ chúng tôi tại',
            phoneNumber: '0911 111 205',
            address: 'Địa chỉ: 112 - Nguyễn Công Trứ - Phường 8 - TP.Đà Lạt',
            email: 'Email: 1910127@dlu.edu.vn',
            social: [
                {
                    path:'/',
                    image: '/assets/icons/ic-social-facebook.png'
                },
                {
                    path:'/',
                    image: '/assets/icons/ic-social-youtube.png'
                },
                {
                    path:'/',
                    image: '/assets/icons/ic-social-twitter.png'
                }]
        },
        cutomerHelper: {
            title: 'Hổ trợ khách hàng'
        }
    },
}