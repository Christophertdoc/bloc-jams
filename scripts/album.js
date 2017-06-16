var createSongRow = function(songNumber, songName, songLength) {
    var template =
       '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;

    var $row = $(template);

    var clickHandler = function() {
          var songNumber = parseInt($(this).attr('data-song-number'));

          if (currentlyPlayingSongNumber !== null) {
              var currentlyPlayingCell = parseInt($('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]'));
              currentlyPlayingCell.html(currentlyPlayingSongNumber);
          }
          if (currentlyPlayingSongNumber !== songNumber) {
              $(this).html(pauseButtonTemplate);
              currentlyPlayingSongNumber = songNumber;
              currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
              updatePlayerBarSong();
          } else if (currentlyPlayingSongNumber === songNumber) {
              $(this).html(playButtonTemplate);
              $('.main-controls .play-pause').html(playerBarPlayButton);
              currentlyPlayingSongNumber = null;
              currentSongFromAlbum = null;
          }
     };

    var onHover = function(event) {
        var songNumberCell = parseInt($(this).find('.song-item-number'));
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
         songNumberCell.html(playButtonTemplate);
        }
     };

     var offHover = function(event) {
        var songNumberCell = parseInt($(this).find('.song-item-number'));
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
          songNumberCell.html(songNumber);
        }

        console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
     };

    $row.find('.song-item-number').click(clickHandler);
     $row.hover(onHover, offHover);
     return $row;
};

var setCurrentAlbum = function(album) {
   currentAlbum = album;
   var $albumTitle = $('.album-view-title');
   var $albumArtist = $('.album-view-artist');
   var $albumReleaseInfo = $('.album-view-release-info');
   var $albumImage = $('.album-cover-art');
   var $albumSongList = $('.album-view-song-list');

    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    $albumSongList.empty();

    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var updatePlayerBarSong = function() {
  $('.currently-playing .artist-name').html(currentAlbum.artist);
  $('.currently-playing .song-name').html(currentSongFromAlbum.title);
  $('.currently-playing .artist-song-mobile').html(currentSongFromAlbum.title + " - " + currentAlbum.artist);
  /* This line from checkpoint code */ $('.main-controls .play-pause').html(playerBarPauseButton);
};

var nextSong = function() {

    var songIndex = trackIndex(currentAlbum, currentSongFromAlbum);

    songIndex++;

    var previousSong = currentlyPlayingSongNumber;

    if (songIndex >= currentAlbum.songs.length) {
      songIndex = 0;
    }

    var currentSongFromAlbum = previousSong + 1;

    updatePlayerBarSong();

    $('.song-item-number').html(currentlyPlayingSongNumber);
    var NewSong = parseInt($('song-item-number').html(currentlyPlayingSongNumber + 1));
};

var previousSong = function() {

    var songIndex = trackIndex(currentAlbum, currentSongFromAlbum);

    songIndex--;

    var nextSong = currentlyPlayingSongNumber;

    if (songIndex === 0) {
      songIndex = currentAlbum.songs.length;
    }

    var currentSongFromAlbum = nextSong - 1;

    updatePlayerBarSong();

    $('.song-item-number').html(currentlyPlayingSongNumber);
    var NewSong = parseInt($('song-item-number').html(currentlyPlayingSongNumber + 1));
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// Store state of playing songs
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});
