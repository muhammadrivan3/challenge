package middleware

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"io"
	"myserver/models"
	"net/http"
	"os"
	"strconv"
)

// Initialize your database connection here
var db *gorm.DB

func init() {
	// Open a connection to the database (replace with your database configuration)
	var err error
	db, err = gorm.Open("postgres", "host=localhost port=5432 user=postgres dbname=challange_db sslmode=disable password=admin")

	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&models.Car{}, &models.Orders{})
}

func GetCars(w http.ResponseWriter, r *http.Request) {
	var cars []models.Car
	db.Find(&cars)
	json.NewEncoder(w).Encode(cars)
}

func GetCar(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var car models.Car
	db.First(&car, params["id"])
	json.NewEncoder(w).Encode(car)
}

func AddCar(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Decode JSON request body into a Car struct
	var car models.Car
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&car); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Create a new car record in the database
	if err := db.Create(&car).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond with the added car data
	json.NewEncoder(w).Encode(car)
}

func UpdateCar(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	params := mux.Vars(r)
	var car models.Car

	if err := db.First(&car, params["id"]).Error; err != nil {
		http.Error(w, "Car not found", http.StatusNotFound)
		return
	}

	// Decode JSON request body into a Car struct
	var updatedCar models.Car
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&updatedCar); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Update car record in the database
	car.CarID = updatedCar.CarID
	car.CarName = updatedCar.CarName
	car.DayRate = updatedCar.DayRate
	car.MonthRate = updatedCar.MonthRate
	car.Image = updatedCar.Image

	db.Save(&car)

	// Respond with the updated car data
	json.NewEncoder(w).Encode(car)
}

func DeleteCar(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	params := mux.Vars(r)
	var car models.Car

	if err := db.First(&car, params["id"]).Error; err != nil {
		http.Error(w, "Car not found", http.StatusNotFound)
		return
	}

	// Delete car record from the database
	db.Delete(&car)

	// Respond with success message
	json.NewEncoder(w).Encode(map[string]string{"message": "Car deleted"})
}

// ORDERS
func GetOrders(w http.ResponseWriter, r *http.Request) {
	var orders []models.Orders
	db.Find(&orders)
	json.NewEncoder(w).Encode(orders)
}
func AddOrders(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Decode JSON request body into a Car struct
	var orders models.Orders
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&orders); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Create a new car record in the database
	if err := db.Create(&orders).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond with the added car data
	json.NewEncoder(w).Encode(orders)
}
func DeleteOrders(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	params := mux.Vars(r)
	idStr := params["id"]
	//var orders models.Orders

	//if err := db.First(&orders, params["id"]).Error; err != nil {
	//	http.Error(w, "Car not found", http.StatusNotFound)
	//	return
	//}
	idOrder, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	result := db.Where("order_id = ?", idOrder).Delete(&models.Orders{})
	if result.Error != nil {
		http.Error(w, "Error deleting orders", http.StatusInternalServerError)
		return
	}

	// Periksa apakah ada data yang dihapus atau tidak
	if result.RowsAffected == 0 {
		http.Error(w, "No orders found with the specified price", http.StatusNotFound)
		return
	}

	// Respon dengan pesan sukses
	json.NewEncoder(w).Encode(map[string]string{"message": "Orders deleted by price"})

	// Delete car record from the database
	//db.Delete(&orders)
	//
	//// Respond with success message
	//json.NewEncoder(w).Encode(map[string]string{"message": "orders deleted"})
}

func GetOrdersWithCars(w http.ResponseWriter, r *http.Request) {
	var orderCarData []struct {
		Order models.Orders
		Car   models.Car `gorm:"column:cars"`
	}

	if err := db.Joins("JOIN cars ON orders.car_id = cars.car_id").Find(&orderCarData).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(&orderCarData)
}

func UploadHandlerImage(w http.ResponseWriter, r *http.Request) {
	file, handler, err := r.FormFile("file") // 'file' is the name attribute of the file input field in your form
	if err != nil {
		fmt.Println("Error receiving file:", err)
		return
	}
	defer file.Close()

	// You can save the file to a directory or process it here
	// For example, save it to a 'uploads' directory
	f, err := os.OpenFile("images/"+handler.Filename, os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		fmt.Println("Error saving file:", err)
		return
	}
	defer f.Close()
	_, err = io.Copy(f, file)
	if err != nil {
		fmt.Println("Error copying file:", err)
		return
	}

	// After saving the file, you can store the file path or other information in your PostgreSQL database
	// Insert code to save the file path to the database here

	// Respond to the client with a success message or other response
	w.Write([]byte("File uploaded successfully!"))
}
func ShowImageHandler(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	filename := params["filename"]

	// Baca gambar dari sistem file atau database
	// Misalnya, jika Anda menyimpan gambar di sistem file:
	file, err := os.Open("images/" + filename)
	if err != nil {
		http.Error(w, "Image not found", http.StatusNotFound)
		return
	}
	defer file.Close()

	// Mengatur header respons
	w.Header().Set("Content-Type", "image/jpeg") // Ganti sesuai dengan tipe gambar yang Anda gunakan

	// Mengirimkan gambar sebagai respons
	io.Copy(w, file)
}
