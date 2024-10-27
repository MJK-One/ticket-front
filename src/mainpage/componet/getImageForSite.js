// getImageForSite.js

function getImageForSite(site) {
  let baseSrc = "/img/siteicon/";

  switch(site) {
    case 'Melon Ticket':
      return baseSrc + 'melon.jpg';
    case 'Interpark Ticket':
      return baseSrc +'interpark.jpg';
    case 'Yes24':
      return baseSrc +'yes24.png';
    case 'Ticket Link':
      return baseSrc +'ticketlink.jpg';
    default:
      return null;  // 기본 이미지 설정 (필요한 경우)
  }
}
export default getImageForSite;
