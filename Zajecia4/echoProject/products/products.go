package products

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"strconv"
)

type Product struct {
	ID    int     `json:"id"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

var ProductsList []*Product
var uniqueID = 0

func GetProducts(c echo.Context) error {
	return c.JSON(http.StatusOK, ProductsList)
}

func GetProductById(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid ID")
	}

	for _, product := range ProductsList {
		if product.ID == id {
			return c.JSON(http.StatusOK, product)
		}
	}
	return echo.NewHTTPError(http.StatusNotFound, "Product Not Found")
}
func CreateProduct(c echo.Context) error {
	product := new(Product)
	if err := c.Bind(product); err != nil {
		return err
	}
	uniqueID++
	product.ID = uniqueID
	ProductsList = append(ProductsList, product)

	return c.JSON(http.StatusCreated, product)
}

func UpdateProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid ID")
	}
	for _, product := range ProductsList {
		if product.ID == id {
			updatedProduct := new(Product)
			if err := c.Bind(product); err != nil {
				return err
			}
			if updatedProduct.Name != "" {
				product.Name = updatedProduct.Name
			}
			if updatedProduct.Price != 0 {
				product.Price = updatedProduct.Price
			}
			return c.JSON(http.StatusOK, product)
		}
	}
	return echo.NewHTTPError(http.StatusNotFound, "Product Not Found")
}

func DeleteProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid ID")
	}
	for i, product := range ProductsList {
		if product.ID == id {
			ProductsList = append(ProductsList[:i], ProductsList[i+1:]...)
			return c.NoContent(http.StatusNoContent)
		}
	}
	return echo.NewHTTPError(http.StatusNotFound, "Product Not Found")
}
