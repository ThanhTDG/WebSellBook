import "./navbar.scss"
import icons from '../../assets/images/ImagesNavbar.js'
import { navbarOptions } from './navbarOption.js'

function Navbar() {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="" />
          {
            icons["search"]
          }
        </div>
        <div className="items">
          {
            RenderOption()
          }
          <div className="item">
            <img
              src="https://i.pinimg.com/236x/62/9e/92/629e9282db7c2e44d4b6a1790952d11d.jpg"
              alt=""
              className="avatar" />
          </div>
        </div>

      </div>
    </div>
  )
}

function RenderOption() {
  return navbarOptions.map((option) => {
    let key = option.key;
    let text = option.text
    if (key === "notification" || key === "chat") {
      return (
        <div className="item">
          {
            icons[key]
          }
          <div className="counter">
            1
          </div>
        </div>
      );
    } else if (key !== "search") {
      return (
        <div className="item">
          {
            icons[key]
          }
        </div>
      );
    } else {
      return;
    }

  });
}



// const Option = ((data, selected, setSelected) => {
//   let key = data.key;
//   menuItem.concat(data);
//   return (
//     <li >
//       <div className={selected === key ? 'menuItem active' : 'menuItem'} key={data.key} onClick={() => {
//         setSelected(key)
//       }} >
//         {images[key]}
//         <span>{data.name}</span>
//       </div>

//     </li >
//   );
// });
export default Navbar