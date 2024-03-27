package main

import (
	"echo-project/products"
	echo "github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	e.GET("/products", products.GetProducts)
	e.GET("/products/:id", products.GetProductById)
	e.POST("/products", products.CreateProduct)
	e.PUT("products/:id", products.UpdateProduct)
	e.DELETE("products/:id", products.DeleteProduct)

	e.Logger.Fatal(e.Start(":8080"))

}
