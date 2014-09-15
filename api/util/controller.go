package util

import (
	"github.com/alinz/gorelax"
)

//Controller Comment TODO
type Controller interface {
	RegisterControllers(relax *gorelax.Relax)
}
