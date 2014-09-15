package model

//Track Comment TODO
type Track struct {
	Name      string `json:"name"`
	StreamURL string `json:"stream_url"`
	Link      string `json:"-"`
}
