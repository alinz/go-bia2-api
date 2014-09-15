package model

//Artist Comment TODO
type Artist struct {
	Name   string  `json:"name"`
	Albums []Album `json:"albums"`
}
