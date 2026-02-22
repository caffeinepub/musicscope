import Text "mo:core/Text";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  type SongId = Text;
  type SongMetadata = {
    id : SongId;
    title : Text;
    artist : Text;
    album : Text;
    mood : Text;
    genre : Text;
    audioUrl : Text;
    audioFileId : ?Text;
    duration : Nat;
    createdAt : Int;
  };
};
