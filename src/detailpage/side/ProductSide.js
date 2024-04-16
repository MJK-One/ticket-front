import './ProductSide.css';
import SideMain from './main/SideMain';
import SideBtns from './btns/SideBtns';

const ProductSide = () => {
    return (
        <div id='productSide' className='productSide'>
            {/* sticky(스크롤하다가 특정 위치가 되면 fixed) */}
            <div className='stickyWrap'>
                <h3 className='blind'>상품 예매하기</h3>
                <SideMain />
                <SideBtns />
            </div>
        </div>
    );
};
export default ProductSide;