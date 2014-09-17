package audio

import (
	"github.com/alinz/go-bia2-api/api/audio/service"
	"github.com/alinz/gorelax"
)

//Controller Comment TODO
type Controller struct{}

//RegisterControllers Comment TODO
func (a Controller) RegisterControllers(relax *gorelax.Relax) {
	relax.RegisterHandler("GET", "/api/build/audio", a.buildAudio)
	relax.RegisterHandler("GET", "/api/search/artist", a.searchArtistByName)
	relax.RegisterHandler("GET", "/api/search/album", a.searchAlbumByName)
	relax.RegisterHandler("GET", "/api/search/track", a.searchTrackByName)
}

func (a Controller) buildAudio(req gorelax.RelaxRequester, res gorelax.RelaxResponser) {
	//service.CrawlAlbums()
	res.Send("Not Required!", 200)
}

func (a Controller) searchArtistByName(req gorelax.RelaxRequester, res gorelax.RelaxResponser) {
	artistName := req.Query("q")
	res.EnableCORS()
	res.SendAsJSON(service.SearchArtist(artistName), 200)
}

func (a Controller) searchAlbumByName(req gorelax.RelaxRequester, res gorelax.RelaxResponser) {
	albumName := req.Query("q")
	res.EnableCORS()
	res.SendAsJSON(service.SearchAlbum(albumName), 200)
}

func (a Controller) searchTrackByName(req gorelax.RelaxRequester, res gorelax.RelaxResponser) {
	trackName := req.Query("q")
	res.EnableCORS()
	res.SendAsJSON(service.SearchTrack(trackName), 200)
}
