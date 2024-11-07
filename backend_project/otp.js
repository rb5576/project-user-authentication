
function generateNumericOtp(length){
    // const characters = "agjhghjgfbcfawnk";
    let otp = '';
    for(let i=0; i<length;i++){
        otp+=Math.floor(Math.random()*10);
    }
    return otp;
};

const otp = generateNumericOtp(10);
console.log("your otp is:",otp);
