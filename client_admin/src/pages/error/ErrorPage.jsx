import React from 'react'
import { Link } from 'react-router-dom';
function ErrorPage() {
    return (
        <div >
            <h2>404, Đã có lỗi xảy ra</h2>
            <p>Xin lỗi vì sự bất tiện này</p>
            <Link to="/">Trở lại trang chủ</Link>
        </div>
    )
}

export default ErrorPage