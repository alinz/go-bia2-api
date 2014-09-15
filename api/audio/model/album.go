package model

//Album Comment TODO
type Album struct {
	Title  string  `json:"title"`
	Poster string  `json:"poster"`
	Link   string  `json:"-"`
	Tracks []Track `json:"tracks"`
}
