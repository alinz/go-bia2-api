package util

import (
	"io/ioutil"
	"net/http"
)

//GetPageByURL Comment TODO
func GetPageByURL(url string) string {
	resp, err := http.Get(url)
	if err != nil {
		return ""
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	return string(body)
}
