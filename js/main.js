var Song = Backbone.Model.extend({
  initialize: function () {
    console.log("A new song has been created.");
  },
  validate: function (attrs) {
    if (!attrs.title) {
      return "Title is required";
    }
  },
  defaults: {
    genre: "Hiphop",
  },
  playSong: function () {
    console.log("Song is now playing...");
  },
});

var song = new Song({
  artist: "Borther Ali",
  publishYear: 2003,
});

var Instrumental = Song.extend({
  playSong: function () {
    // This line of code allows you to utilize a method form the base model even tho it is being overwritten in the submodel
    // Song.prototype.playSong.apply(this);

    console.log("Instrumental song is now playing...");
  },
});

var instrumental = new Instrumental();

instrumental.playSong();
