package main

import (
	"github.com/rs/cors"
	"log"
	"myserver/routers"
	"net/http"
)

func main() {
	router := routers.Router()
	// Create a CORS handler with the desired options
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://127.0.0.1:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowCredentials: true,
		Debug:            true, // Set to true for debugging CORS issues
	})

	// Wrap your router with the CORS handler
	routerWithCors := corsHandler.Handler(router)
	//handler := cors.Default().Handler(router)

	log.Fatal(http.ListenAndServe("0.0.0.0:8081", routerWithCors))
}
