Meteor.methods({
  donate: function (payload) {
    client = Simplify.getClient({
      publicKey: 'sbpb_NGQwM2RiZDctNTY3MC00MzY4LThjYjUtNDgwZDZkNDdkZjQ5',
      privateKey: 'x6q0Q+vSpXFZn71HQE9+4keU1LTp10NcI8avXxv29El5YFFQL0ODSXAOkNtXTToq'
    });


    (function(arr){
      payload.month=arr[0]; 
      payload.year=arr[1];
    })(payload.date.split("/"));

    payload.amount *= 100;
    payload.number = payload.number.replace(/\s+/g, '');

    payment_obj = {
      amount : payload.amount,
      description : "Donation to Wish Wizard",
      card : {
         expMonth : payload.month,
         expYear : payload.year,
         cvc : payload.cvc,
         number : payload.number
      },
      currency : "USD"
      };

    console.log(payment_obj);

    client.payment.create(payment_obj, function(errData, data){
      if(errData){
        console.error("Error Message: " + errData.data.error.message);
        // handle the error
        return;
      }
      console.log("Payment Status: " + data.paymentStatus);
    });
  }
});