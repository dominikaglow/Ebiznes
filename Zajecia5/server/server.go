package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

type Product struct {
	ID    int     `json:"id"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

type Payment struct {
	CardNumber string `json:"cardNumber"`
	NameOnCard string `json:"nameOnCard"`
	ExpiryDate string `json:"expiryDate"`
	CVV        string `json:"cvv"`
}

func main() {
	http.HandleFunc("/products", handleProducts)
	http.HandleFunc("/payments", handlePayments)
	http.HandleFunc("/", indexHandler)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	log.Printf("Listening on port %s", port)
	log.Printf("Open http://localhost:%s in the browser", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), nil))
}

func handleProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	products := []Product{
		{ID: 1, Name: "Product 1", Price: 10.99},
		{ID: 2, Name: "Product 2", Price: 19.64},
		{ID: 3, Name: "Product 3", Price: 64.39},
		{ID: 4, Name: "Product 4", Price: 254.39},
		{ID: 5, Name: "Product 5", Price: 46.48},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

func handlePayments(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var payment Payment
	err := json.NewDecoder(r.Body).Decode(&payment)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println("Error decoding payment data:", err)
		return
	}

	fmt.Println("Received payment data:")
	fmt.Println("CardNumber:", payment.CardNumber)
	fmt.Println("NameOnCard:", payment.NameOnCard)
	fmt.Println("ExpiryDate:", payment.ExpiryDate)
	fmt.Println("CVV:", payment.CVV)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(payment)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	_, err := fmt.Fprint(w, "Home Page")
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
}
