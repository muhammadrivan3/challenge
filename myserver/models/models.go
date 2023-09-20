package models

import (
	"github.com/jinzhu/gorm"
)

//	type Car struct {
//		gorm.Model
//		Year      int
//		Make      string
//		ModelName string
//	}
type Users struct {
	gorm.Model
	Username string `gorm:"not null"`
	Password string `gorm:"not null"`
}
type Car struct {
	gorm.Model
	CarID     int
	CarName   string  `gorm:"size:50;not null"`
	DayRate   float64 `gorm:"not null"`
	MonthRate float64 `gorm:"not null"`
	Image     string  `gorm:"size:256;not null"`
}
type Orders struct {
	gorm.Model
	OrderID         int
	CarID           int    `gorm:"foreignKey:CarID"`
	OrderDate       string `gorm:"type:date;not null"`
	PickupDate      string `gorm:"type:date;not null"`
	DropoffDate     string `gorm:"type:date;not null"`
	PickupLocation  string `gorm:"size:50;not null"`
	DropoffLocation string `gorm:"size:50;not null"`
}
