Meteor.methods({
  foo: function (payload) {
    Simplify.getClient({
      publicKey: 'sbpb_NGQwM2RiZDctNTY3MC00MzY4LThjYjUtNDgwZDZkNDdkZjQ5',
      privateKey: 'x6q0Q+vSpXFZn71HQE9+4keU1LTp10NcI8avXxv29El5YFFQL0ODSXAOkNtXTToq'
    });

    console.log(payload);
  }
});