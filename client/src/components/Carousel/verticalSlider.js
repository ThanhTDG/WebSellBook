import { Link } from 'react-router-dom';
import './verticalSlider.scss'
const sliderStyles = {
  position: "relative",
  height: "100%",
};



const VerticalSlider = ({ slides }) => {
    function setBannerStyle(d){
        var delta =(d-1)*164;
        var l = (parseInt(d)%2)===0? 52: 0
        return{
            width: '50%',
            height: '320px',
            backgroundColor:'var(--White)',
            position:'absolute',
            top:`${delta}px`,
            left:`${l}%`,
            borderRadius:'12px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            padding:'12px',
            paddingBottom:'16px'
        }
    }
    function setImageStyle(url){
        return{
            background:`url(${url}) center center`,
            padding: '8px',
            borderRadius: '0',
            width: '100%',
            height: '90%',
            backgroundSize: 'cover'
        }
    }
  return (
    
    <div style={sliderStyles}>
      {slides.map((sld)=>(
        <div style={setBannerStyle(sld.order)}>
            <Link to={{}} state={{ book: sld.detail}}>
                <div className='vertical-banner' style={setImageStyle(sld.url.substr(0, sld.url.length-1))}></div>
                <div className='vertical-banner-content'>
                    <p>{sld.title}</p>
                </div>
                <div>
                    {/* <img className='vertical-banner-hight-light-icon' src={`${MyVariable.hostName}/assets/icons/star.gif`} alt='hot'/> */}
                    {/* <p className='vertical-banner-hight-light'>-{sld.discountrate}</p> */}
                </div>
            </Link>
        </div>
      ))}
    </div>
  );
};

export default VerticalSlider;