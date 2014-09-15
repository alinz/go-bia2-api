package service

import (
	"github.com/alinz/go-bia2-api/api/audio/model"
	"labix.org/v2/mgo"
	"labix.org/v2/mgo/bson"
)

func makeDBConnection() *mgo.Session {
	session, err := mgo.Dial("127.0.0.1")
	if err != nil {
		panic(err)
	}

	session.SetMode(mgo.Monotonic, true)

	return session
}

//SearchArtist Comment TODO
func SearchArtist(artistName string) []model.Artist {
	session := makeDBConnection()
	c := session.DB("bia2").C("artists")
	defer session.Close()

	results := []model.Artist{}
	c.Find(bson.M{"name": &bson.RegEx{Pattern: artistName, Options: "i"}}).Limit(5).All(&results)

	return results
}

//SearchAlbum Comment TODO
func SearchAlbum(albumName string) []model.Artist {
	session := makeDBConnection()
	c := session.DB("bia2").C("artists")
	defer session.Close()

	results := []model.Artist{}

	c.Find(bson.M{"albums": bson.M{"$elemMatch": bson.M{"title": &bson.RegEx{Pattern: albumName, Options: "i"}}}}).Limit(5).All(&results)

	return results
}

//SearchTrack Comment TODO
func SearchTrack(trackName string) []model.Artist {
	session := makeDBConnection()
	c := session.DB("bia2").C("artists")
	defer session.Close()

	results := []model.Artist{}

	c.Find(bson.M{"albums": bson.M{"$elemMatch": bson.M{"tracks": bson.M{"$elemMatch": bson.M{"name": &bson.RegEx{Pattern: trackName, Options: "i"}}}}}}).Limit(5).All(&results)

	return results
}
