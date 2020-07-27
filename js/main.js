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

var songWithIdC1 = songs.get("c1"); // gets model based on cid

songs.remove(firstSong); // removes model when used with get/at

songs.add(new Song({ title: "Song 1 NEW" }), { at: 0 }); // specifies which index to add the song

songs.push(new Song({ title: "Song 4 NEW" })); // Works just like JS array method

var lastSongPopped = songs.pop(); // Works just like JS array method

console.log(lastSongPopped);

// SEARCH METHODS //

var hiphopSongs = songs.where({ genre: "Hiphop" });

var firstHiphopSong = songs.findWhere({ genre: "Hiphop" });

console.log("Hiphop songs: ", hiphopSongs);

console.log("First hiphop song: ", firstHiphopSong);

var filteredSongs = songs.where({ genre: "Hiphop", title: "Song 2" });

console.log("Filtered songs", filteredSongs);

var topDownloads = songs.filter(function (song) {
  return song.get("downloads") > 50;
});

console.log("Top Downloads: ", topDownloads);

songs.each(function (song) {
  console.log(song);
});
