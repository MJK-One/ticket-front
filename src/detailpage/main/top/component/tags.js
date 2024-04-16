import './tags.css';

//단독판매
const popExclusive = (
    <div className='tagItem' key='TAGS_exc'>
        <a className='tagButton is-accent' role='botton' href='#'>
            단독판매
        </a>
    </div>
);

//좌석우위
const popAdventage = (
    <div className='tagItem' key='TAGS_adv'>
        <a className='tagButton' role='botton' href='#'>
            좌석우위
        </a>
    </div>
);

//안심예매
const popTrusty = (
    <div className='tagItem' key='TAGS_tru'>
        <a className='tagButton' role='botton' href='#'>
            안심예매
        </a>
    </div>
);

//예매대기
const popWating = (
    <div className='tagItem' key='TAGS_wat'>
        <a className='tagButton' role='botton' href='#'>
            예매대기
        </a>
    </div>
);

const Tags = () => {
    return (
        <div className='tagList'>
            {popExclusive}
            {popAdventage}
            {popTrusty}
            {popWating}
        </div>
    );
};
export default Tags;