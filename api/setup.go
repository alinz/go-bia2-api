package api

import (
	"os"
	"path/filepath"

	"github.com/alinz/go-bia2-api/api/audio"
	"github.com/alinz/go-bia2-api/api/util"
	"github.com/alinz/gorelax"
)

func attachControllers(relax *gorelax.Relax) {
	apis := []util.Controller{
		audio.Controller{},
	}

	for _, api := range apis {
		api.RegisterControllers(relax)
	}
}

//Setup Comment TODO
func Setup() {
	relax := gorelax.NewRelax()
	fpath, _ := filepath.Abs(filepath.Dir(os.Args[0]))
	fpath += "/static"
	relax.RegisterStaticHandler("/static/", fpath)
	attachControllers(relax)

	relax.Listen("", 9000)
}
