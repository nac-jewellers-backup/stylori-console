export const makeid = ((length, prefix,couponcount) => {
  var count = 1;
  var codes = []
  if(couponcount)
  {
    count = couponcount;
  }
  let codelength = length - prefix.length
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  generatecode(0)
  function generatecode(generatedcount)
  {
  for ( var i = 0; i < codelength; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  result = prefix.toUpperCase() + result.toUpperCase();
  codes.push(result)
  result = ""
  generatedcount = generatedcount + 1
  if(count > generatedcount)
  {
    generatecode(generatedcount);
  }
  }
  return codes;
});