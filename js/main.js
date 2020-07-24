var Song = Backbone.Model.extend({
  initialize: function () {
    console.log("A new song has been created.");
  },
  defaults: {
    genre: "Hiphop",
  },
});

var song = new Song({
  title: "Forest Whittaker",
  artist: "Borther Ali",
  publishYear: 2003,
});
