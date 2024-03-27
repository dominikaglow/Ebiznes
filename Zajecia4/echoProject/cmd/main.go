package main

import (
	"echo-project/models"
	"echo-project/products"
	echo "github.com/labstack/echo/v4"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DbProducts *gorm.DB

func main() {
	var err error
	DbProducts, err = gorm.Open(sqlite.Open("products.db"), &gorm.Config{})
	if err != nil {
		panic("Connection failed")
	}
	DbProducts.AutoMigrate(&models.Product{})

	e := echo.New()

	products.InitDB(DbProducts)

	e.GET("/products", products.GetProducts)
	e.GET("/products/:id", products.GetProductById)
	e.POST("/products", products.CreateProduct)
	e.PUT("products/:id", products.UpdateProduct)
	e.DELETE("products/:id", products.DeleteProduct)

	e.Logger.Fatal(e.Start(":8080"))

}
