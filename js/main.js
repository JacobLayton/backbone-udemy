// =============== Models =================//
// Initial Model
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

// Extended sub-model
var Instrumental = Song.extend({
  playSong: function () {
    // This line of code allows you to utilize a method form the base model even tho it is being overwritten in the submodel
    // Song.prototype.playSong.apply(this);

    console.log("Instrumental song is now playing...");
  },
});

// Instantiate new Song model called song
var song = new Song({
  artist: "Borther Ali",
  title: "Forrest Whittaker",
  publishYear: 2003,
});

// Instantiate new Instrumental submodel called instrumental
var instrumental = new Instrumental();

// Calls thhe playSong() method of instrumental
instrumental.playSong();

//======================Collections=======================//

var Songs = Backbone.Collection.extend({
  model: Song,
});

var songs = new Songs([
  new Song({ title: "Song 1", downloads: 40 }),
  new Song({ title: "Song 2", downloads: 90 }),
  new Song({ title: "Song 3", downloads: 150 }),
]);

songs.add(new Song({ title: "Song 4" }));

var firstSong = songs.at(0); // gets model at specified index

var songWithIdC1 = songs.get("c1"); // gets model based on cid or attr

songs.remove(firstSong); // removes model when used with get/at

songs.add(new Song({ title: "Song 1 NEW" }), { at: 0 }); // specifies which index to add the song

songs.push(new Song({ title: "Song 4 NEW" })); // Works just like JS array method

var lastSongPopped = songs.pop(); // Works just like JS array method

console.log(lastSongPopped);

// SEARCH METHODS //

var hiphopSongs = songs.where({ genre: "Hiphop" }); // returns array of models with matching attr

var firstHiphopSong = songs.findWhere({ genre: "Hiphop" }); // returns first instance of matching attr

console.log("Hiphop songs: ", hiphopSongs);

console.log("First hiphop song: ", firstHiphopSong);

var filteredSongs = songs.where({ genre: "Hiphop", title: "Song 2" }); // filter with multiple attrs

console.log("Filtered songs", filteredSongs);

var topDownloads = songs.filter(function (song) {
  // filter with js filter with get in callback
  return song.get("downloads") > 50;
});

console.log("Top Downloads: ", topDownloads);

songs.each(function (song) {
  // each works just like js forEach()
  console.log(song);
});

// ===================== VIEWS ====================== //

// var SongView = Backbone.View.extend({
//   tagName: "span", // Changes element type

//   className: "song", // adds classname

//   id: "1234", // Adds Id

//   attributes: {
//     "data-genre": "Jazz", // adds html5 data attributes
//   },

//   render: function () {
//     this.$el.html("Hello World"); // this.$el is jquery object that conatins the views dom element
//     // .html is a jquery method to display "hello world" on the view
//     return this; // returns a reference to the view, this helps chain method calls
//   },
// });

// var songView = new SongView(); // When instantiating the view, specify which dom element it's attached to
// // songView.render();  // The render method is chained into the line below

// $("#container").html(songView.render().$el); // jQuery slector to get the container element
// // then using the html method to insert the view's dom element inside the conatiner

var SongView = Backbone.View.extend({
  // model view
  tagName: "li",

  events: {
    click: "onClick",
    "click .bookmark": "onClickBookmark",
  },

  onClick: function () {
    console.log("Listen Clicked");
  },

  onClickBookmark: function (e) {
    e.stopPropagation();
    console.log("Bookmark Clicked");
  },

  render: function () {
    this.$el.html(
      this.model.get("title") +
        "<button>Listen</button> <button class='bookmark'>Bookmark</button>"
    );

    return this;
  },
});

var songView = new SongView({ el: "#song", model: song });
songView.render();

var SongsView = Backbone.View.extend({
  // Collection view
  render: function () {
    var self = this; // context of this cahnges inside the callback function, so this line fixes the error

    this.model.each(function (song) {
      var colSongView = new SongView({ model: song });
      self.$el.append(colSongView.render().$el);
    });
  },
});

var songsView = new SongsView({ el: "#songs", model: songs });
songsView.render();
