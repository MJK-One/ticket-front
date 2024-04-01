export const getResizeEventListener = (standardWidth, standardHeight) => {
    return () => {
      const root = document.querySelector("#root");
      const app = document.querySelector("#App");
  
      // 원하는 해상도로 width, height 고정
      app.style.width = `${standardWidth}px`;
      app.style.height = `${standardHeight}px`;
  
      let width = root.clientWidth;
      let height = width * (standardHeight / standardWidth);
      
      // style.zoom을 이용하여, 화면을 크기를 조정
      app.style.zoom = height / standardHeight; 
  
      if (height > root.clientHeight) {
        height = root.clientHeight;
        width = height * (standardWidth / standardHeight);
        
        // style.zoom을 이용하여, 화면을 크기를 조정
        app.style.zoom = width / standardWidth; 
      }
    };
  };