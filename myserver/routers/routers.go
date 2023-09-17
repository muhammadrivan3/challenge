package routers

import (
	"github.com/gorilla/mux"
	"myserver/middleware"
)

func Router() *mux.Router {
	router := mux.NewRouter()

	// Routes for cars
	router.HandleFunc("/api/v1/cars", middleware.GetCars).Methods("GET")
	router.HandleFunc("/api/v1/cars/{id}", middleware.GetCar).Methods("GET")
	router.HandleFunc("/api/v1/cars", middleware.AddCar).Methods("POST")
	router.HandleFunc("/api/v1/cars/{id}", middleware.UpdateCar).Methods("PUT")
	router.HandleFunc("/api/v1/cars/{id}", middleware.DeleteCar).Methods("DELETE")
	//Routes for orders
	router.HandleFunc("/api/v1/orders", middleware.GetOrders).Methods("GET")
	router.HandleFunc("/api/v1/orders", middleware.AddOrders).Methods("POST")
	router.HandleFunc("/api/v1/orders/{id}", middleware.DeleteOrders).Methods("DELETE")
	router.HandleFunc("/api/v1/ordersx", middleware.GetOrdersWithCars).Methods("GET")

	//Upload Image
	router.HandleFunc("/api/v1/image", middleware.UploadHandlerImage).Methods("POST")
	router.HandleFunc("/images/{filename}", middleware.ShowImageHandler).Methods("GET")
	return router
}
