const redirect = ()=>{
   return window.location.replace(`http://localhost:3000/my-queue`);
};

setTimeout(redirect, 5000);
