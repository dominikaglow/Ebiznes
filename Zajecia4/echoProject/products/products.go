package products

import (
	"echo-project/models"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"strconv"
)

var DbProducts *gorm.DB

func InitDB(db *gorm.DB) {
	DbProducts = db
}
func GetProducts(c echo.Context) error {
	var products []models.Product
	err := DbProducts.Find(&products).Error
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Error fetching products")
	}
	return c.JSON(http.StatusOK, products)
}

func GetProductById(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid ID")
	}

	var product models.Product
	err = DbProducts.First(&product, id).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return echo.NewHTTPError(http.StatusNotFound, "Product not found")
		}
		return echo.NewHTTPError(http.StatusInternalServerError, "Error during fetching product")
	}
	return c.JSON(http.StatusOK, product)
}
func CreateProduct(c echo.Context) error {
	product := new(models.Product)
	if err := c.Bind(product); err != nil {
		return err
	}
	if err := DbProducts.Create(product).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Error during creating product")
	}
	return c.JSON(http.StatusCreated, product)
}

func UpdateProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid ID")
	}

	var product models.Product
	if err := DbProducts.First(&product, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return echo.NewHTTPError(http.StatusNotFound, "Produc Not Found")
		}
		return echo.NewHTTPError(http.StatusInternalServerError, "Error during fetching product")
	}
	if err := c.Bind(&product); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request payload")
	}
	if err := DbProducts.Save(&product).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Error updating product")
	}
	return c.JSON(http.StatusOK, product)
}

func DeleteProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid ID")
	}
	var product models.Product
	if err := DbProducts.First(&product, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return echo.NewHTTPError(http.StatusNotFound, "Product Not Found")
		}
		return echo.NewHTTPError(http.StatusInternalServerError, "Error during fetching product")
	}
	if err := DbProducts.Delete(&product).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Error deleting product")
	}
	return c.JSON(http.StatusOK, product)
}
