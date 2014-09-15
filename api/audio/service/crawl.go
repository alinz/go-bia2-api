package service

import (
	"regexp"
	"strconv"

	"labix.org/v2/mgo"
	"labix.org/v2/mgo/bson"

	"github.com/PuerkitoBio/goquery"
	"github.com/alinz/go-bia2-api/api/audio/model"
	"github.com/alinz/go-bia2-api/api/util"
)

var extractPoster = regexp.MustCompile("url\\('(.+)'\\);")
var extractMp3Stream = regexp.MustCompile("file: \\\"(.+)\\.mp3\\\"")

func parseAlbumsPage(totalPage int, out chan<- model.Artist) {
	go (func() {
		for page := 1; page <= totalPage; page++ {

			doc, _ := goquery.NewDocument("https://www.bia2.com/music/albums/?resultpage=" + strconv.Itoa(page))

			doc.Find(".music-block-feat").Each(func(i int, s *goquery.Selection) {
				titleNode := s.Find(".music-cover-title")
				title := titleNode.Text()
				url, _ := titleNode.Attr("href")
				url = "https://www.bia2.com" + url

				poster, _ := s.Find(".image-hover-opacity").Attr("style")
				if extractPoster.MatchString(poster) {
					subStrings := extractPoster.FindStringSubmatch(poster)
					poster = subStrings[1]
				}

				artist := model.Artist{}

				artist.Name = s.Find(".music-cover-artist").Text()

				artist.Albums = append(artist.Albums, model.Album{
					Title:  title,
					Link:   url,
					Poster: poster,
				})

				out <- artist
			})
		}

		close(out)
	})()
}

func parseTracksPage(in <-chan model.Artist, out chan<- model.Artist) {
	for {
		artist, ok := <-in
		if !ok {
			break
		}
		doc, err := goquery.NewDocument(artist.Albums[0].Link)

		if err != nil {
			continue
		}

		doc.Find(".album_title").Each(func(i int, s *goquery.Selection) {
			url, _ := s.Attr("href")
			url = "https://www.bia2.com" + url
			trackName := s.Children().Eq(1).Text()
			artist.Albums[0].Tracks = append(artist.Albums[0].Tracks, model.Track{
				Name: trackName,
				Link: url,
			})
		})

		out <- artist
	}
	close(out)
}

func getTrackStreamURL(url string) string {
	content := util.GetPageByURL(url)
	if extractMp3Stream.MatchString(content) {
		subStrings := extractMp3Stream.FindStringSubmatch(content)
		return subStrings[1] + ".mp3"
	}
	return ""
}

func parseTrackFile(in <-chan model.Artist, out chan<- model.Artist) {
	for {
		artist, ok := <-in
		if !ok {
			break
		}

		for index := range artist.Albums[0].Tracks {
			url := artist.Albums[0].Tracks[index].Link
			artist.Albums[0].Tracks[index].StreamURL = getTrackStreamURL(url)
		}

		out <- artist
	}
	close(out)
}

//CrawlAlbums Comment TODO
func CrawlAlbums() {
	albumsChannel := make(chan model.Artist, 15)
	trackListChannel := make(chan model.Artist, 1)
	finalChannel := make(chan model.Artist)

	go (func() {
		parseTracksPage(albumsChannel, trackListChannel)
	})()

	go (func() {
		parseTrackFile(trackListChannel, finalChannel)
	})()

	go (func() {
		session, err := mgo.Dial("127.0.0.1")
		if err != nil {
			panic(err)
		}

		session.SetMode(mgo.Monotonic, true)
		session.DB("bia2").DropDatabase()
		c := session.DB("bia2").C("artists")

		defer session.Close()

		for {
			artist, ok := <-finalChannel
			if !ok {
				break
			}

			result := model.Artist{}
			c.Find(bson.M{"name": artist.Name}).One(&result)

			if result.Name == artist.Name {
				c.Update(bson.M{"name": artist.Name}, bson.M{
					"$push": bson.M{"albums": artist.Albums[0]},
				})
			} else {
				c.Insert(&artist)
			}
		}
	})()

	parseAlbumsPage(66, albumsChannel)
}
